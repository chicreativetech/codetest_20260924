import { use } from 'react';
import type { TaskFilters } from '../../types/taskFilters';
import { TaskFilterActionsContext, TaskFiltersStateContext, type TaskFilterActions } from './taskFiltersContext';

export function useTaskFilters(): TaskFilters {
  const filters = use(TaskFiltersStateContext);
  if (!filters) throw new Error('useTaskFilters must be used inside <TaskFiltersProvider>');
  return filters;
}

export function useTaskFilterActions(): TaskFilterActions {
  const actions = use(TaskFilterActionsContext);
  if (!actions) throw new Error('useTaskFilterActions must be used inside <TaskFiltersProvider>');
  return actions;
}
