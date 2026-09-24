import { useMemo, useReducer, type ReactNode } from 'react';
import { TaskFilterActionsContext, TaskFiltersStateContext, type TaskFilterActions } from './taskFiltersContext';
import { INITIAL_FILTERS, taskFiltersReducer } from './taskFiltersReducer';

interface TaskFiltersProviderProps {
  children: ReactNode;
}

export function TaskFiltersProvider({ children }: TaskFiltersProviderProps) {
  const [filters, dispatch] = useReducer(taskFiltersReducer, INITIAL_FILTERS);

  const actions = useMemo<TaskFilterActions>(
    () => ({
      setStatuses: (statuses) => dispatch({ type: 'statusesChanged', statuses }),
      setPriorities: (priorities) => dispatch({ type: 'prioritiesChanged', priorities }),
      setAssignee: (assignee) => dispatch({ type: 'assigneeChanged', assignee }),
      clearFilters: () => dispatch({ type: 'filtersCleared' })
    }),
    []
  );

  return (
    <TaskFilterActionsContext value={actions}>
      <TaskFiltersStateContext value={filters}>{children}</TaskFiltersStateContext>
    </TaskFilterActionsContext>
  );
}
