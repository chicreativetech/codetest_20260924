import { Alert, AlertTitle, Button } from '@mui/material';
import type { ErrorFallbackProps } from '../ErrorBoundary/ErrorBoundary';

export function TaskListErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <Alert
      severity='error'
      action={
        <Button color='inherit' size='small' onClick={reset}>
          Try again
        </Button>
      }
    >
      <AlertTitle>Something went wrong while displaying tasks</AlertTitle>
      {error.message}
    </Alert>
  );
}
