import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '../../constants/task';
import type { Task, TaskStatus } from '../../types/task';
import { formatDate } from '../../utils/formatDate';
import { TaskStatusSelect } from '../TaskStatusSelect/TaskStatusSelect';
import styles from './TaskCard.module.scss';

export interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
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
          <TaskStatusSelect
            value={task.status}
            label={`Status of ${task.title}`}
            onChange={(status) => onStatusChange(task.id, status)}
          />
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
