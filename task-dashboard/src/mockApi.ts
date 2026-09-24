import type { Task, TaskStatus } from './types/task';

// In-memory "database". Kept mutable so a refetch reflects previously saved status changes.
const TASKS: Task[] = [
  {
    id: '1',
    title: 'Design system tokens',
    description: 'Define color and spacing tokens',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Alice',
    createdAt: '2026-05-28T10:00:00Z'
  },
  {
    id: '2',
    title: 'API integration',
    description: 'Connect to backend REST API',
    status: 'todo',
    priority: 'medium',
    assignee: 'Bob',
    createdAt: '2026-05-29T09:00:00Z'
  },
  {
    id: '3',
    title: 'Unit tests',
    description: 'Write tests for hooks',
    status: 'done',
    priority: 'low',
    assignee: 'Alice',
    createdAt: '2026-05-30T14:00:00Z'
  },
  {
    id: '4',
    title: 'Performance audit',
    description: 'Run Lighthouse and fix issues',
    status: 'todo',
    priority: 'high',
    assignee: 'Charlie',
    createdAt: '2026-06-01T08:00:00Z'
  },
  {
    id: '5',
    title: 'Accessibility review',
    description: 'Ensure WCAG 2.1 AA compliance',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Bob',
    createdAt: '2026-06-01T11:00:00Z'
  }
];

export function fetchTasks(): Promise<Task[]> {
  return new Promise((resolve) => setTimeout(() => resolve(TASKS.map((task) => ({ ...task }))), 800));
}

export function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const task = TASKS.find((t) => t.id === id);
      if (!task) {
        reject(new Error(`Task ${id} not found`));
        return;
      }
      task.status = status;
      resolve({ ...task });
    }, 300)
  );
}
