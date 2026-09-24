import { useCallback, useEffect, useReducer, useRef } from 'react';
import { updateTaskStatus } from '../../mockApi';
import type { Task, TaskStatus } from '../../types/task';
import { getCachedTasks, loadTasks, setCachedTasks } from './tasksCache';
import { createInitialState, tasksReducer, type FetchStatus } from './tasksReducer';

export interface UseTasksResult {
  tasks: Task[];
  fetchStatus: FetchStatus;
  isRefetching: boolean;
  fetchError: Error | null;
  refetch: () => Promise<void>;
  updateStatus: (id: string, status: TaskStatus) => Promise<void>;
}

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

export function useTasks(): UseTasksResult {
  const [state, dispatch] = useReducer(tasksReducer, getCachedTasks(), createInitialState);
  const latestRequestId = useRef(0);
  const tasksRef = useRef(state.tasks);

  useEffect(() => {
    tasksRef.current = state.tasks;
    if (state.fetchStatus === 'success') setCachedTasks(state.tasks);
  }, [state.tasks, state.fetchStatus]);

  const refetch = useCallback(async () => {
    const requestId = ++latestRequestId.current;
    dispatch({ type: 'fetchStarted' });
    try {
      const tasks = await loadTasks();
      // Ignore responses from requests that have since been superseded.
      if (requestId === latestRequestId.current) dispatch({ type: 'fetchSucceeded', tasks });
    } catch (error) {
      if (requestId === latestRequestId.current) dispatch({ type: 'fetchFailed', error: toError(error) });
    }
  }, []);

  const updateStatus = useCallback(async (id: string, status: TaskStatus) => {
    const previousStatus = tasksRef.current.find((task) => task.id === id)?.status;
    if (!previousStatus || previousStatus === status) return;

    dispatch({ type: 'statusChanged', id, status });
    try {
      await updateTaskStatus(id, status);
    } catch (error) {
      console.error(`Failed to update status of task ${id}; reverting.`, error);
      dispatch({ type: 'statusRolledBack', id, from: status, to: previousStatus });
    }
  }, []);

  useEffect(() => {
    if (!getCachedTasks()) void refetch();
  }, [refetch]);

  return { ...state, refetch, updateStatus };
}
