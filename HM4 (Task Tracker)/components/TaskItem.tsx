import Image from 'next/image';
import { Task } from '@/types';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { id, title, completed, priority } = task;
  
  return (
    <div className={`${styles.taskItem} ${styles[`task${priority.charAt(0).toUpperCase() + priority.slice(1)}`]}`}>
      <div className={styles.imageContainer}>
          <Image 
            src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=100&auto=format&fit=crop"
            alt="Pending"
            width={40}
            height={40}
            className="rounded-full"
          />
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <h3 className={styles.taskTitle}>{title}</h3>
          <span className={`${styles.priorityBadge} ${styles[`priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`]}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>
        
        <div className={styles.statusContainer}>
          <div className={`${styles.statusDot} ${completed ? styles.statusCompleted : styles.statusPending}`}></div>
          <span className={styles.statusText}>
            {completed ? 'Completed' : 'Pending'}
          </span>
          <span className={styles.taskId}>Task #{id}</span>
        </div>
      </div>
    </div>
  );
}