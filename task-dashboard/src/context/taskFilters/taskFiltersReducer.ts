import type { TaskPriority, TaskStatus } from '../../types/task';
import type { TaskFilters } from '../../types/taskFilters';

export type TaskFiltersAction =
  | { type: 'statusesChanged'; statuses: TaskStatus[] }
  | { type: 'prioritiesChanged'; priorities: TaskPriority[] }
  | { type: 'assigneeChanged'; assignee: string | null }
  | { type: 'filtersCleared' };

export const INITIAL_FILTERS: TaskFilters = {
  statuses: [],
  priorities: [],
  assignee: null
};

export function taskFiltersReducer(filters: TaskFilters, action: TaskFiltersAction): TaskFilters {
  switch (action.type) {
    case 'statusesChanged':
      return { ...filters, statuses: action.statuses };
    case 'prioritiesChanged':
      return { ...filters, priorities: action.priorities };
    case 'assigneeChanged':
      return { ...filters, assignee: action.assignee };
    case 'filtersCleared':
      return INITIAL_FILTERS;
  }
}
