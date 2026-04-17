export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: string;
  createdAt: string;
  dueDate?: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export type SortOption = 'newest' | 'oldest' | 'priority' | 'dueDate';

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
  percentComplete: number;
}
