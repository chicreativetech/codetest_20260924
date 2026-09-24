import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import { PRIORITY_COLORS, PRIORITY_LABELS, STATUS_COLORS, STATUS_LABELS } from '../../constants/task';
import type { Task } from '../../types/task';
import { formatDate } from '../../utils/formatDate';
import styles from './TaskCard.module.scss';

export interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card variant='outlined' component='article' aria-labelledby={`task-${task.id}-title`}>
      <CardContent className={styles.content}>
        <div className={styles.header}>
          <Typography id={`task-${task.id}-title`} variant='subtitle1' component='h3' className={styles.title}>
            {task.title}
          </Typography>
          <Chip size='small' label={PRIORITY_LABELS[task.priority]} color={PRIORITY_COLORS[task.priority]} />
        </div>
        <Typography variant='body2' color='text.secondary'>
          {task.description}
        </Typography>
        <div className={styles.footer}>
          <Chip size='small' variant='outlined' label={STATUS_LABELS[task.status]} color={STATUS_COLORS[task.status]} />
          <TaskMeta Icon={PersonOutlined} label={task.assignee} />
          <TaskMeta Icon={CalendarTodayOutlined} label={formatDate(task.createdAt)} />
        </div>
      </CardContent>
    </Card>
  );
}

interface TaskMetaProps {
  Icon: SvgIconComponent;
  label: string;
}

function TaskMeta({ Icon, label }: TaskMetaProps) {
  return (
    <Typography variant='caption' color='text.secondary' className={styles.meta}>
      <Icon className={styles.metaIcon} aria-hidden='true' />
      {label}
    </Typography>
  );
}
