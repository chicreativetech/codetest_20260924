import type { ChipProps } from '@mui/material';
import type { TaskPriority, TaskStatus } from '../types/task';

type ChipColor = ChipProps['color'];

export const TASK_STATUSES: readonly TaskStatus[] = ['todo', 'in-progress', 'done'];

export const TASK_PRIORITIES: readonly TaskPriority[] = ['low', 'medium', 'high'];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done'
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};

export const STATUS_COLORS: Record<TaskStatus, ChipColor> = {
  todo: 'default',
  'in-progress': 'info',
  done: 'success'
};

export const PRIORITY_COLORS: Record<TaskPriority, ChipColor> = {
  low: 'default',
  medium: 'warning',
  high: 'error'
};
