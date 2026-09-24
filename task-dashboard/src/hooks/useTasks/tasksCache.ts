import { fetchTasks } from '../../mockApi';
import type { Task } from '../../types/task';

// Module-level cache: survives re-renders and remounts, so the list is only fetched once per session
// unless a refetch is requested explicitly.
let cachedTasks: Task[] | null = null;
let pendingRequest: Promise<Task[]> | null = null;

export function getCachedTasks(): Task[] | null {
  return cachedTasks;
}

export function setCachedTasks(tasks: Task[]): void {
  cachedTasks = tasks;
}

export function clearTasksCache(): void {
  cachedTasks = null;
  pendingRequest = null;
}

// Concurrent callers (e.g. StrictMode's double-invoked effects) share a single in-flight request.
export async function loadTasks(): Promise<Task[]> {
  pendingRequest ??= fetchTasks().finally(() => {
    pendingRequest = null;
  });
  const tasks = await pendingRequest;
  cachedTasks = tasks;
  return tasks;
}
