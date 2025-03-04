import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import TaskDetailClient from '@/components/TaskDetailClient';
import { Task } from '@/types';
import styles from './page.module.css';

// Function to assign priority based on task ID
function assignPriority(id: number): 'high' | 'medium' | 'low' {
  if (id % 3 === 0) return 'high';
  if (id % 3 === 1) return 'medium';
  return 'low';
}

// Function to get priority label
function getPriorityLabel(priority: string): string {
  switch (priority) {
    case 'high': return 'High Priority';
    case 'medium': return 'Medium Priority';
    case 'low': return 'Low Priority';
    default: return 'Unknown Priority';
  }
}

// Function to get task image based on priority
function getTaskImage(priority: string): string {
  switch (priority) {
    case 'high':
      return 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?q=80&w=800&auto=format&fit=crop';
    case 'medium':
      return 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop';
    case 'low':
      return 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop';
    default:
      return 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop';
  }
}

async function getTask(id: string) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch task');
    }
    
    const task: Task = await res.json();
    const priority = assignPriority(task.id);
    
    return {
      ...task,
      priority
    };
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
}

export default async function TaskDetail({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);
  
  if (!task) {
    notFound();
  }
  
  const priority = task.priority;
  const priorityLabel = getPriorityLabel(priority);
  const taskImage = getTaskImage(priority);
  
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.backIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Tasks
      </Link>
      
      <div className={styles.taskCard}>
        <div className={styles.imageContainer}>
          <Image 
            src={taskImage}
            alt={`Task ${task.id}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className={styles.contentContainer}>
          <div className={`${styles.priorityBadge} ${styles[`priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`]}`}>
            {priorityLabel}
          </div>
          
          <h1 className={styles.taskTitle}>{task.title}</h1>
          
          <div className={styles.statusContainer}>
            <div className={`${styles.statusDot} ${task.completed ? styles.statusCompleted : styles.statusPending}`}></div>
            <span className={styles.statusText}>
              Status: <span className={styles.statusValue}>{task.completed ? 'Completed' : 'Pending'}</span>
            </span>
          </div>
          
          <div className={styles.metaContainer}>
            <p className={styles.metaItem}>
              <span className={styles.metaLabel}>Task ID:</span> {task.id}
            </p>
            <p className={styles.metaItem}>
              <span className={styles.metaLabel}>User ID:</span> {task.userId}
            </p>
          </div>
          
          <TaskDetailClient task={task} />
        </div>
      </div>
    </div>
  );
}