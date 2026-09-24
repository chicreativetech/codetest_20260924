import { useMemo } from 'react';
import { useTaskFilters } from '../context/taskFilters/useTaskFilters';
import type { Task } from '../types/task';
import { filterTasks } from '../utils/filterTasks';
import { useDebouncedValue } from './useDebouncedValue';

const FILTER_DEBOUNCE_MS = 150;

// The filter controls update instantly, but the list is only re-filtered once the user pauses, so rapid
// changes (e.g. ticking several statuses in a row) cause a single re-filter and re-render instead of one per
// click. If filtering moved server-side, the same debounced value would drive the request, and useTasks
// already discards responses from superseded requests.
export function useFilteredTasks(tasks: Task[]): Task[] {
  const filters = useDebouncedValue(useTaskFilters(), FILTER_DEBOUNCE_MS);
  return useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
}
