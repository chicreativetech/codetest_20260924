import { useMemo } from 'react';
import { useTaskFilters } from '../context/taskFilters/useTaskFilters';
import type { Task } from '../types/task';
import { filterTasks } from '../utils/filterTasks';

export function useFilteredTasks(tasks: Task[]): Task[] {
  const filters = useTaskFilters();
  return useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
}
