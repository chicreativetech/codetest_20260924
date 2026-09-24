import { act, renderHook, waitFor } from '@testing-library/react';
import { fetchTasks, updateTaskStatus } from '../../mockApi';
import type { Task } from '../../types/task';
import { clearTasksCache } from './tasksCache';
import { useTasks } from './useTasks';

vi.mock('../../mockApi');

const TASK: Task = {
  id: '1',
  title: 'Write tests',
  description: 'Cover useTasks',
  status: 'todo',
  priority: 'high',
  assignee: 'Alice',
  createdAt: '2026-05-28T10:00:00Z'
};

async function renderLoadedHook() {
  const hook = renderHook(() => useTasks());
  await waitFor(() => expect(hook.result.current.fetchStatus).toBe('success'));
  return hook;
}

describe('useTasks', () => {
  beforeEach(() => {
    clearTasksCache();
    vi.mocked(fetchTasks).mockResolvedValue([TASK]);
  });

  it('starts loading and then returns the fetched tasks', async () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.fetchStatus).toBe('loading');

    await waitFor(() => expect(result.current.fetchStatus).toBe('success'));
    expect(result.current.tasks).toEqual([TASK]);
  });

  it('serves later mounts from the cache without refetching', async () => {
    await renderLoadedHook();
    const { result } = renderHook(() => useTasks());

    expect(result.current.fetchStatus).toBe('success');
    expect(fetchTasks).toHaveBeenCalledTimes(1);
  });

  it('exposes fetch errors and recovers on refetch', async () => {
    vi.mocked(fetchTasks).mockRejectedValueOnce(new Error('Network down'));
    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.fetchError?.message).toBe('Network down'));

    await act(() => result.current.refetch());
    expect(result.current.fetchStatus).toBe('success');
    expect(result.current.tasks).toEqual([TASK]);
  });

  it('updates the status optimistically before the API responds', async () => {
    vi.mocked(updateTaskStatus).mockReturnValue(new Promise(() => {}));
    const { result } = await renderLoadedHook();

    act(() => void result.current.updateStatus(TASK.id, 'done'));
    expect(result.current.tasks[0].status).toBe('done');
  });

  it('rolls the status back and reports the failed update when the update fails', async () => {
    const serverError = new Error('Server error');
    vi.mocked(updateTaskStatus).mockRejectedValue(serverError);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = await renderLoadedHook();

    await act(() => result.current.updateStatus(TASK.id, 'done'));
    expect(result.current.tasks[0].status).toBe('todo');
    expect(result.current.updateError).toEqual({ taskTitle: TASK.title, error: serverError });
    expect(consoleError).toHaveBeenCalledWith(expect.any(String), serverError);
    consoleError.mockRestore();

    act(() => result.current.dismissUpdateError());
    expect(result.current.updateError).toBeNull();
  });
});
