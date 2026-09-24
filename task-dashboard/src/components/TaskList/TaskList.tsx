import type { Task } from '../../types/task';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskList.module.scss';

export interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className={styles.list} aria-label='Tasks'>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
