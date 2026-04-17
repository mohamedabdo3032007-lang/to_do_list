import React from 'react';
import { ClipboardList } from 'lucide-react';
import type { Task } from '../types';
import TaskItem from './TaskItem';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <div className="empty-icon-wrapper">
          <ClipboardList size={48} />
        </div>
        <h3>No tasks found</h3>
        <p>Your list is clear! Enjoy your day or add something new.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div 
          key={task.id} 
          style={{ animationDelay: `${index * 0.05}s` }}
          className="task-item-wrapper"
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
