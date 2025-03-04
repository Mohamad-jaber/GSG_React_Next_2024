import Link from 'next/link';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/types';
import styles from './page.module.css';

// Function to assign priority manually based on task ID 
function assignPriority(id: number) {
  if (id % 3 === 0) return 'high';
  if (id % 3 === 1) return 'medium';
  return 'low';
}

// Extend the task data with priority
function extendTaskWithPriority(task: Task): Task{
  return {
    ...task,
    priority: assignPriority(task.id)
  };
}

async function getTasks() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    
    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    const tasks: Task[] = await res.json();
    return tasks.map(extendTaskWithPriority);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export default async function Home() {
  const tasks = await getTasks();
  
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Task Tracker</h1>
        <p className={styles.subtitle}>Manage your tasks efficiently</p>
      </header>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Tasks</h2>
        
        <div className={styles.taskList}>
          {tasks.map((task) => (
            <Link key={task.id} href={`/task/${task.id}`} className={styles.taskLink}>
              <TaskItem task={task} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}