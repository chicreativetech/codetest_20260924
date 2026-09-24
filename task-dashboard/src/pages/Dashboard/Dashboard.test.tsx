import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

async function getTaskCards() {
  const list = await screen.findByRole('list', { name: 'Tasks' }, { timeout: 2000 });
  return within(list).queryAllByRole('article');
}

describe('Dashboard filtering', () => {
  it('reduces the visible tasks when a priority filter is selected and restores them on clear', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(await getTaskCards()).toHaveLength(5);

    await user.click(screen.getByRole('combobox', { name: 'Priority' }));
    await user.click(screen.getByRole('option', { name: 'High' }));
    await user.keyboard('{Escape}');
    expect(await getTaskCards()).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(await getTaskCards()).toHaveLength(5);
  });
});
