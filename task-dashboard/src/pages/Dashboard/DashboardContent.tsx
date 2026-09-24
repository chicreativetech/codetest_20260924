import { Alert, Button, Skeleton } from '@mui/material';
import type { ReactNode } from 'react';
import type { FetchStatus } from '../../hooks/useTasks/tasksReducer';
import { TaskList } from '../../components/TaskList/TaskList';
import { TaskListSkeleton } from '../../components/TaskListSkeleton/TaskListSkeleton';
import { TaskStats } from '../../components/TaskStats/TaskStats';
import type { Task, TaskStatus } from '../../types/task';
import styles from './Dashboard.module.scss';

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

export function DashboardContent({ tasks, fetchStatus, fetchError, onRetry, onStatusChange }: DashboardContentProps) {
  if (fetchStatus === 'loading') {
    return (
      <DashboardLayout
        main={<TaskListSkeleton />}
        sidebar={<Skeleton variant='rounded' className={styles.statsSkeleton} />}
      />
    );
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
      sidebar={<TaskStats tasks={tasks} />}
    />
  );
}
