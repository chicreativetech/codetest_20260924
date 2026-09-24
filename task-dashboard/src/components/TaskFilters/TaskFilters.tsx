import FilterListOutlined from '@mui/icons-material/FilterListOutlined';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './TaskFilters.module.scss';

// Filter controls are wired to a shared filter context in Task 3, so this component takes no props.
export function TaskFilters() {
  return (
    <Card variant='outlined' component='section' aria-labelledby='task-filters-title'>
      <CardContent className={styles.content}>
        <Typography id='task-filters-title' variant='subtitle1' component='h2' className={styles.title}>
          <FilterListOutlined fontSize='small' aria-hidden='true' />
          Filters
        </Typography>
      </CardContent>
    </Card>
  );
}
