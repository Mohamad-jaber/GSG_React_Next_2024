'use client';

import { useState } from 'react';
import { Task } from '@/types';
import styles from './TaskDetailClient.module.css';

interface TaskDetailClientProps {
  task: Task & { priority?: string };
}

export default function TaskDetailClient({ task }: TaskDetailClientProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(task.title);
      setCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <div className={styles.container}>
      <button 
        onClick={copyToClipboard}
        className={`${styles.button} ${copied ? styles.secondaryButton : styles.primaryButton}`}
      >
        {copied ? 'Copied to clipboard!' : 'Copy task title to clipboard'}
      </button>
    </div>
  );
}