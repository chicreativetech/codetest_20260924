import type { Task, TaskStatus } from '../../types/task';

export type FetchStatus = 'loading' | 'success' | 'error';

export interface TasksState {
  tasks: Task[];
  fetchStatus: FetchStatus;
  isRefetching: boolean;
  fetchError: Error | null;
}

export type TasksAction =
  | { type: 'fetchStarted' }
  | { type: 'fetchSucceeded'; tasks: Task[] }
  | { type: 'fetchFailed'; error: Error }
  | { type: 'statusChanged'; id: string; status: TaskStatus }
  | { type: 'statusRolledBack'; id: string; from: TaskStatus; to: TaskStatus };

export function createInitialState(cachedTasks: Task[] | null): TasksState {
  return {
    tasks: cachedTasks ?? [],
    fetchStatus: cachedTasks ? 'success' : 'loading',
    isRefetching: false,
    fetchError: null
  };
}

// Unchanged tasks keep their object identity, so memoised cards can skip re-rendering.
function withTaskStatus(tasks: Task[], id: string, status: TaskStatus): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, status } : task));
}

function rollBackStatus(state: TasksState, action: Extract<TasksAction, { type: 'statusRolledBack' }>): TasksState {
  const task = state.tasks.find((t) => t.id === action.id);
  // Only undo if nothing newer has overwritten the optimistic value in the meantime.
  const tasks = task?.status === action.from ? withTaskStatus(state.tasks, action.id, action.to) : state.tasks;
  return { ...state, tasks };
}

export function tasksReducer(state: TasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case 'fetchStarted':
      return state.fetchStatus === 'success'
        ? { ...state, isRefetching: true }
        : { ...state, fetchStatus: 'loading', fetchError: null };
    case 'fetchSucceeded':
      return { ...state, tasks: action.tasks, fetchStatus: 'success', isRefetching: false, fetchError: null };
    case 'fetchFailed':
      return { ...state, fetchStatus: 'error', isRefetching: false, fetchError: action.error };
    case 'statusChanged':
      return { ...state, tasks: withTaskStatus(state.tasks, action.id, action.status) };
    case 'statusRolledBack':
      return rollBackStatus(state, action);
  }
}
