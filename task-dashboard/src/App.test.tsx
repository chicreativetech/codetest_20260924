import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the dashboard heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Task Dashboard' })).toBeInTheDocument();
  });

  it('renders a card for every task once loaded', async () => {
    render(<App />);
    const list = await screen.findByRole('list', { name: 'Tasks' }, { timeout: 2000 });
    expect(within(list).getAllByRole('article')).toHaveLength(5);
  });
});
