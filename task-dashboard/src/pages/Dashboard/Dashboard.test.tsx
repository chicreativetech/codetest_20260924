import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import App from '../../App';

function getTaskCards() {
  const list = screen.queryByRole('list', { name: 'Tasks' });
  return list ? within(list).queryAllByRole('article') : [];
}

// Filters are debounced, so the list updates shortly after the selection rather than synchronously.
async function expectTaskCount(count: number) {
  await waitFor(() => expect(getTaskCards()).toHaveLength(count), { timeout: 2000 });
}

async function selectOption(user: UserEvent, filter: string, option: string) {
  await user.click(screen.getByRole('combobox', { name: filter }));
  await user.click(screen.getByRole('option', { name: option }));
  await user.keyboard('{Escape}');
}

describe('Dashboard filtering', () => {
  it('reduces the visible tasks when a priority filter is selected and restores them on clear', async () => {
    const user = userEvent.setup();
    render(<App />);
    await expectTaskCount(5);

    await selectOption(user, 'Priority', 'High');
    await expectTaskCount(2);

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    await expectTaskCount(5);
  });

  it('shows a zero state when no task matches and lets the user clear the filters from it', async () => {
    const user = userEvent.setup();
    render(<App />);
    await expectTaskCount(5);

    await selectOption(user, 'Priority', 'High');
    await selectOption(user, 'Status', 'Done');
    const emptyState = await screen.findByRole('region', { name: 'No tasks match your filters' });

    await user.click(within(emptyState).getByRole('button', { name: 'Clear filters' }));
    await expectTaskCount(5);
  });
});
