import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskListErrorFallback } from '../TaskList/TaskListErrorFallback';
import { ErrorBoundary } from './ErrorBoundary';

let shouldThrow = true;

function FlakyList() {
  if (shouldThrow) throw new Error('Card data is malformed');
  return <p>Tasks rendered</p>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrow = true;
    // React logs caught render errors; silence them to keep the test output readable.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it('shows the fallback when a child throws and renders the children again after a reset', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary fallback={TaskListErrorFallback}>
        <FlakyList />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Card data is malformed');

    shouldThrow = false;
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(screen.getByText('Tasks rendered')).toBeInTheDocument();
  });
});
