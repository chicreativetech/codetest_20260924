import type { TaskPriority, TaskStatus } from './task';

// An empty list (or null assignee) means "no filter": every task matches.
export interface TaskFilters {
  statuses: TaskStatus[];
  priorities: TaskPriority[];
  assignee: string | null;
}
