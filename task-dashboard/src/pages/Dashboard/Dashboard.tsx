import { TaskFilters } from '../../components/TaskFilters/TaskFilters';
import { useTasks } from '../../hooks/useTasks/useTasks';
import styles from './Dashboard.module.scss';
import { DashboardContent } from './DashboardContent';
import { DashboardHeader } from './DashboardHeader';

export function Dashboard() {
  const { tasks, fetchStatus, isRefetching, fetchError, refetch, updateStatus } = useTasks();

  return (
    <main className={styles.dashboard}>
      <DashboardHeader isRefreshing={isRefetching} canRefresh={fetchStatus === 'success'} onRefresh={refetch} />
      <TaskFilters />
      <DashboardContent
        tasks={tasks}
        fetchStatus={fetchStatus}
        fetchError={fetchError}
        onRetry={refetch}
        onStatusChange={updateStatus}
      />
    </main>
  );
}
