import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the dashboard heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Task Dashboard' })).toBeInTheDocument();
  });

  it('renders a card for every task', () => {
    render(<App />);
    expect(within(screen.getByRole('list', { name: 'Tasks' })).getAllByRole('article')).toHaveLength(5);
  });
});
