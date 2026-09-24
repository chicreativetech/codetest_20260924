import RefreshOutlined from '@mui/icons-material/RefreshOutlined';
import { IconButton, Tooltip, Typography } from '@mui/material';
import styles from './Dashboard.module.scss';

interface DashboardHeaderProps {
  isRefreshing: boolean;
  canRefresh: boolean;
  onRefresh: () => void;
}

export function DashboardHeader({ isRefreshing, canRefresh, onRefresh }: DashboardHeaderProps) {
  return (
    <header className={styles.header}>
      <Typography variant='h4' component='h1'>
        Task Dashboard
      </Typography>
      <Tooltip title='Refresh tasks'>
        <span>
          <IconButton
            edge='end'
            aria-label='Refresh tasks'
            onClick={onRefresh}
            loading={isRefreshing}
            disabled={!canRefresh}
          >
            <RefreshOutlined />
          </IconButton>
        </span>
      </Tooltip>
    </header>
  );
}
