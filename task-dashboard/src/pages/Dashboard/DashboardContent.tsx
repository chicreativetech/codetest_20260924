import { Alert, Button, Skeleton } from '@mui/material';
import { lazy, Suspense, type ReactNode } from 'react';
import type { FetchStatus } from '../../hooks/useTasks/tasksReducer';
import { TaskList } from '../../components/TaskList/TaskList';
import { TaskListSkeleton } from '../../components/TaskListSkeleton/TaskListSkeleton';
import type { Task, TaskStatus } from '../../types/task';
import styles from './Dashboard.module.scss';

// Code-split: TaskStats is loaded in its own chunk, only once there are tasks to summarise.
const TaskStats = lazy(async () => {
  const { TaskStats } = await import('../../components/TaskStats/TaskStats');
  return { default: TaskStats };
});

interface DashboardContentProps {
  tasks: Task[];
  fetchStatus: FetchStatus;
  fetchError: Error | null;
  onRetry: () => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

interface DashboardLayoutProps {
  main: ReactNode;
  sidebar: ReactNode;
}

function DashboardLayout({ main, sidebar }: DashboardLayoutProps) {
  return (
    <div className={styles.content}>
      {main}
      <aside className={styles.sidebar}>{sidebar}</aside>
    </div>
  );
}

function TaskStatsSkeleton() {
  return <Skeleton variant='rounded' className={styles.statsSkeleton} />;
}

export function DashboardContent({ tasks, fetchStatus, fetchError, onRetry, onStatusChange }: DashboardContentProps) {
  if (fetchStatus === 'loading') {
    return <DashboardLayout main={<TaskListSkeleton />} sidebar={<TaskStatsSkeleton />} />;
  }

  if (fetchStatus === 'error') {
    return (
      <Alert
        severity='error'
        action={
          <Button color='inherit' size='small' onClick={onRetry}>
            Retry
          </Button>
        }
      >
        Could not load tasks. {fetchError?.message}
      </Alert>
    );
  }

  return (
    <DashboardLayout
      main={<TaskList tasks={tasks} onStatusChange={onStatusChange} />}
      sidebar={
        <Suspense fallback={<TaskStatsSkeleton />}>
          <TaskStats tasks={tasks} />
        </Suspense>
      }
    />
  );
}
