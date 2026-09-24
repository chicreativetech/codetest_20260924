import { Skeleton } from '@mui/material';
import styles from './TaskListSkeleton.module.scss';

const PLACEHOLDER_COUNT = 3;

export function TaskListSkeleton() {
  return (
    <div className={styles.list} role='status' aria-label='Loading tasks'>
      {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
        <Skeleton key={index} variant='rounded' className={styles.card} />
      ))}
    </div>
  );
}
