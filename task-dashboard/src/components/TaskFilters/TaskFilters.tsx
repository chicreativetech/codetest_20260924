import FilterListOutlined from '@mui/icons-material/FilterListOutlined';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { PRIORITY_LABELS, STATUS_LABELS, TASK_PRIORITIES, TASK_STATUSES } from '../../constants/task';
import { useTaskFilterActions, useTaskFilters } from '../../context/taskFilters/useTaskFilters';
import { hasActiveFilters } from '../../utils/filterTasks';
import { AssigneeFilter } from './AssigneeFilter';
import { MultiSelectFilter } from './MultiSelectFilter';
import styles from './TaskFilters.module.scss';

export interface TaskFiltersProps {
  assignees: string[];
}

export function TaskFilters({ assignees }: TaskFiltersProps) {
  const filters = useTaskFilters();
  const { setStatuses, setPriorities, setAssignee, clearFilters } = useTaskFilterActions();

  return (
    <Card variant='outlined' component='section' aria-labelledby='task-filters-title'>
      <CardContent className={styles.content}>
        <div className={styles.header}>
          <Typography id='task-filters-title' variant='subtitle1' component='h2' className={styles.title}>
            <FilterListOutlined fontSize='small' aria-hidden='true' />
            Filters
          </Typography>
          <Button
            size='small'
            className={styles.clearButton}
            onClick={clearFilters}
            disabled={!hasActiveFilters(filters)}
          >
            Clear filters
          </Button>
        </div>
        <div className={styles.controls}>
          <MultiSelectFilter
            label='Status'
            options={TASK_STATUSES}
            optionLabels={STATUS_LABELS}
            value={filters.statuses}
            onChange={setStatuses}
          />
          <MultiSelectFilter
            label='Priority'
            options={TASK_PRIORITIES}
            optionLabels={PRIORITY_LABELS}
            value={filters.priorities}
            onChange={setPriorities}
          />
          <AssigneeFilter assignees={assignees} value={filters.assignee} onChange={setAssignee} />
        </div>
      </CardContent>
    </Card>
  );
}
