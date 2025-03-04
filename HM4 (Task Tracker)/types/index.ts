export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}