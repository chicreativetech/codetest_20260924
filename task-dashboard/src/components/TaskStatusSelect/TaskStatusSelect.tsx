import { MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { STATUS_LABELS, TASK_STATUSES } from '../../constants/task';
import type { TaskStatus } from '../../types/task';
import styles from './TaskStatusSelect.module.scss';

export interface TaskStatusSelectProps {
  value: TaskStatus;
  label: string;
  onChange: (status: TaskStatus) => void;
}

export function TaskStatusSelect({ value, label, onChange }: TaskStatusSelectProps) {
  const handleChange = (event: SelectChangeEvent<TaskStatus>) => onChange(event.target.value as TaskStatus);

  return (
    <Select
      size='small'
      value={value}
      onChange={handleChange}
      className={styles.select}
      inputProps={{ 'aria-label': label }}
    >
      {TASK_STATUSES.map((status) => (
        <MenuItem key={status} value={status}>
          {STATUS_LABELS[status]}
        </MenuItem>
      ))}
    </Select>
  );
}
