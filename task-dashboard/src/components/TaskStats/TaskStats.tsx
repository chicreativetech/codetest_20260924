import { Card, CardContent, Typography } from '@mui/material';
import { STATUS_LABELS, TASK_STATUSES } from '../../constants/task';
import type { Task, TaskStatus } from '../../types/task';
import styles from './TaskStats.module.scss';

export interface TaskStatsProps {
  tasks: Task[];
}

function countByStatus(tasks: Task[]): Record<TaskStatus, number> {
  const counts: Record<TaskStatus, number> = { todo: 0, 'in-progress': 0, done: 0 };
  tasks.forEach((task) => counts[task.status]++);
  return counts;
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const counts = countByStatus(tasks);

  return (
    <Card variant='outlined' component='section' aria-labelledby='task-stats-title'>
      <CardContent className={styles.content}>
        <Typography id='task-stats-title' variant='subtitle1' component='h2' className={styles.title}>
          Overview
        </Typography>
        <dl className={styles.stats}>
          <StatRow label='Total' value={tasks.length} />
          {TASK_STATUSES.map((status) => (
            <StatRow key={status} label={STATUS_LABELS[status]} value={counts[status]} />
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

interface StatRowProps {
  label: string;
  value: number;
}

function StatRow({ label, value }: StatRowProps) {
  return (
    <div className={styles.row}>
      <Typography component='dt' variant='body2' color='text.secondary'>
        {label}
      </Typography>
      <Typography component='dd' variant='body2' className={styles.value}>
        {value}
      </Typography>
    </div>
  );
}
