import type { Task } from '../types/task';
import type { TaskFilters } from '../types/taskFilters';

function matchesAny<T>(selected: readonly T[], value: T): boolean {
  return selected.length === 0 || selected.includes(value);
}

export function filterTasks(tasks: Task[], { statuses, priorities, assignee }: TaskFilters): Task[] {
  return tasks.filter(
    (task) =>
      matchesAny(statuses, task.status) &&
      matchesAny(priorities, task.priority) &&
      (assignee === null || task.assignee === assignee)
  );
}

export function hasActiveFilters({ statuses, priorities, assignee }: TaskFilters): boolean {
  return statuses.length > 0 || priorities.length > 0 || assignee !== null;
}

export function getAssignees(tasks: Task[]): string[] {
  return [...new Set(tasks.map((task) => task.assignee))].sort((a, b) => a.localeCompare(b));
}
