import type { Task, TaskStatus } from '../../types/task';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskList.module.scss';

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskList({ tasks, onStatusChange }: TaskListProps) {
  return (
    <ul className={styles.list} aria-label='Tasks'>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} onStatusChange={onStatusChange} />
        </li>
      ))}
    </ul>
  );
}
