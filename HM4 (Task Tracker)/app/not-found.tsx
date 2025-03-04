import Link from 'next/link';
import Image from 'next/image';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <Image 
        src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=500&auto=format&fit=crop"
        alt="Not Found" 
        width={300} 
        height={200}
        className={styles.image}
      />
      <h1 className={styles.title}>Task Not Found</h1>
      <p className={styles.message}>
        Sorry, the task you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/" className={styles.link}>
        Back to Homepage
      </Link>
    </div>
  );
}