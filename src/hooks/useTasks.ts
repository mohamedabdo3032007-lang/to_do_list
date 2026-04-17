import { useMemo } from 'react';
import type { Task, Priority, FilterStatus, SortOption } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);

  const addTask = (title: string, priority: Priority, category: string, dueDate?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTasks(result);
  };

  const getFilteredTasks = (
    status: FilterStatus,
    sort: SortOption,
    searchQuery: string
  ) => {
    let filtered = [...tasks];

    // Status Filter
    if (status === 'active') {
      filtered = filtered.filter((t) => !t.completed);
    } else if (status === 'completed') {
      filtered = filtered.filter((t) => t.completed);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'priority': {
          const priorityMap = { high: 3, medium: 2, low: 1 };
          return priorityMap[b.priority] - priorityMap[a.priority];
        }
        case 'dueDate': {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        default:
          return 0;
      }
    });

    return filtered;
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const percentComplete = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, active, percentComplete };
  }, [tasks]);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
    reorderTasks,
    getFilteredTasks,
    stats,
  };
}
