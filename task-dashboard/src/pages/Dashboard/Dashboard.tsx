import { useMemo } from 'react';
import { TaskFilters } from '../../components/TaskFilters/TaskFilters';
import { useFilteredTasks } from '../../hooks/useFilteredTasks';
import { useTasks } from '../../hooks/useTasks/useTasks';
import { getAssignees } from '../../utils/filterTasks';
import styles from './Dashboard.module.scss';
import { DashboardContent } from './DashboardContent';
import { DashboardHeader } from './DashboardHeader';

export function Dashboard() {
  const { tasks, fetchStatus, isRefetching, fetchError, refetch, updateStatus } = useTasks();
  const filteredTasks = useFilteredTasks(tasks);
  const assignees = useMemo(() => getAssignees(tasks), [tasks]);

  return (
    <main className={styles.dashboard}>
      <DashboardHeader isRefreshing={isRefetching} canRefresh={fetchStatus === 'success'} onRefresh={refetch} />
      <TaskFilters assignees={assignees} />
      <DashboardContent
        tasks={filteredTasks}
        fetchStatus={fetchStatus}
        fetchError={fetchError}
        onRetry={refetch}
        onStatusChange={updateStatus}
      />
    </main>
  );
}
