import type { Task } from '../types/task';
import type { TaskFilters } from '../types/taskFilters';
import { filterTasks, getAssignees, hasActiveFilters } from './filterTasks';

function createTask(overrides: Partial<Task>): Task {
  return {
    id: '1',
    title: 'Task',
    description: '',
    status: 'todo',
    priority: 'low',
    assignee: 'Alice',
    createdAt: '2026-05-28T10:00:00Z',
    ...overrides
  };
}

const TASKS: Task[] = [
  createTask({ id: '1', status: 'todo', priority: 'high', assignee: 'Alice' }),
  createTask({ id: '2', status: 'done', priority: 'high', assignee: 'Bob' }),
  createTask({ id: '3', status: 'in-progress', priority: 'low', assignee: 'Alice' })
];

const NO_FILTERS: TaskFilters = { statuses: [], priorities: [], assignee: null };

function ids(tasks: Task[]): string[] {
  return tasks.map((task) => task.id);
}

describe('filterTasks', () => {
  it('returns every task when no filters are active', () => {
    expect(filterTasks(TASKS, NO_FILTERS)).toEqual(TASKS);
  });

  it('matches any of the selected statuses', () => {
    expect(ids(filterTasks(TASKS, { ...NO_FILTERS, statuses: ['todo', 'done'] }))).toEqual(['1', '2']);
  });

  it('combines filters with AND', () => {
    expect(ids(filterTasks(TASKS, { ...NO_FILTERS, priorities: ['high'], assignee: 'Alice' }))).toEqual(['1']);
  });
});

describe('hasActiveFilters', () => {
  it('is false for empty filters and true once any filter is set', () => {
    expect(hasActiveFilters(NO_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...NO_FILTERS, assignee: 'Bob' })).toBe(true);
  });
});

describe('getAssignees', () => {
  it('returns unique assignees in alphabetical order', () => {
    expect(getAssignees([...TASKS].reverse())).toEqual(['Alice', 'Bob']);
  });
});
