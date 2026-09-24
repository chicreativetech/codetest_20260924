import { createContext } from 'react';
import type { TaskPriority, TaskStatus } from '../../types/task';
import type { TaskFilters } from '../../types/taskFilters';

export interface TaskFilterActions {
  setStatuses: (statuses: TaskStatus[]) => void;
  setPriorities: (priorities: TaskPriority[]) => void;
  setAssignee: (assignee: string | null) => void;
  clearFilters: () => void;
}

// State and actions live in separate contexts: components that only change filters
// get a stable actions object and don't re-render when the filter values change.
export const TaskFiltersStateContext = createContext<TaskFilters | null>(null);
export const TaskFilterActionsContext = createContext<TaskFilterActions | null>(null);
