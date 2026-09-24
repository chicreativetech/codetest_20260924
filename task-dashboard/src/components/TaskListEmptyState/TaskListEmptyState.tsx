import InboxOutlined from '@mui/icons-material/InboxOutlined';
import SearchOffOutlined from '@mui/icons-material/SearchOffOutlined';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useTaskFilterActions, useTaskFilters } from '../../context/taskFilters/useTaskFilters';
import { hasActiveFilters } from '../../utils/filterTasks';
import styles from './TaskListEmptyState.module.scss';

// With no filters active, an empty list means there are no tasks at all; otherwise the filters excluded them.
export function TaskListEmptyState() {
  const isFiltered = hasActiveFilters(useTaskFilters());
  const { clearFilters } = useTaskFilterActions();
  const Icon = isFiltered ? SearchOffOutlined : InboxOutlined;

  return (
    <Card variant='outlined' component='section' aria-labelledby='task-empty-title'>
      <CardContent className={styles.content}>
        <Icon className={styles.icon} color='disabled' aria-hidden='true' />
        <Typography id='task-empty-title' variant='subtitle1' component='h2' className={styles.title}>
          {isFiltered ? 'No tasks match your filters' : 'No tasks yet'}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {isFiltered
            ? 'Try removing a filter to see more tasks.'
            : 'New tasks will appear here once they are created.'}
        </Typography>
        {isFiltered && (
          <Button variant='outlined' size='small' className={styles.action} onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
