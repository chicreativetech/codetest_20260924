import { Alert, Snackbar, type SnackbarCloseReason } from '@mui/material';
import { useState, type SyntheticEvent } from 'react';
import type { TaskUpdateError } from '../../hooks/useTasks/tasksReducer';

const AUTO_HIDE_MS = 6000;

export interface TaskUpdateErrorSnackbarProps {
  updateError: TaskUpdateError | null;
  onClose: () => void;
}

export function TaskUpdateErrorSnackbar({ updateError, onClose }: TaskUpdateErrorSnackbarProps) {
  // Keep showing the last error while the snackbar animates out, after `updateError` is already null.
  const [shownError, setShownError] = useState(updateError);
  if (updateError && updateError !== shownError) setShownError(updateError);

  // An error should stay visible until it times out or is dismissed, not vanish on the next click elsewhere.
  const handleClose = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason !== 'clickaway') onClose();
  };

  return (
    <Snackbar
      open={updateError !== null}
      autoHideDuration={AUTO_HIDE_MS}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity='error' variant='filled' onClose={onClose}>
        Couldn’t update “{shownError?.taskTitle}”. The status was reverted.
      </Alert>
    </Snackbar>
  );
}
