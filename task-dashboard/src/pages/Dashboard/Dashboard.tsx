import { Typography } from '@mui/material';
import type { Task } from '../../types/task';
import { TaskFilters } from '../../components/TaskFilters/TaskFilters';
import { TaskList } from '../../components/TaskList/TaskList';
import { TaskStats } from '../../components/TaskStats/TaskStats';
import styles from './Dashboard.module.scss';

export interface DashboardProps {
  tasks: Task[];
}

export function Dashboard({ tasks }: DashboardProps) {
  return (
    <main className={styles.dashboard}>
      <Typography variant='h4' component='h1'>
        Task Dashboard
      </Typography>
      <TaskFilters />
      <div className={styles.content}>
        <TaskList tasks={tasks} />
        <aside className={styles.sidebar}>
          <TaskStats tasks={tasks} />
        </aside>
      </div>
    </main>
  );
}
