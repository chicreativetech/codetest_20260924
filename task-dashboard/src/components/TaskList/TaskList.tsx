import { useIncrementalList } from '../../hooks/useIncrementalList';
import type { Task, TaskStatus } from '../../types/task';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskList.module.scss';

const PAGE_SIZE = 50;

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskList({ tasks, onStatusChange }: TaskListProps) {
  const { visibleItems, hasMore, sentinelRef } = useIncrementalList(tasks, PAGE_SIZE);

  return (
    <div>
      <ul className={styles.list} aria-label='Tasks'>
        {visibleItems.map((task) => (
          <li key={task.id} className={styles.item}>
            <TaskCard task={task} onStatusChange={onStatusChange} />
          </li>
        ))}
      </ul>
      {hasMore && <div ref={sentinelRef} aria-hidden='true' />}
    </div>
  );
}
