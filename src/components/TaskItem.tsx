import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Calendar, Tag, Clock } from 'lucide-react';
import type { Task } from '../types';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEditSubmit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, { title: editTitle });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} animate-fade-in`}>
      <div className="task-content">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className="checkmark">
            <Check size={14} />
          </span>
        </label>

        <div className="task-details">
          {isEditing ? (
            <div className="edit-mode">
              <input
                type="text"
                className="edit-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSubmit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
              />
              <div className="edit-actions">
                <button onClick={handleEditSubmit} className="icon-btn save"><Check size={16} /></button>
                <button onClick={handleCancelEdit} className="icon-btn cancel"><X size={16} /></button>
              </div>
            </div>
          ) : (
            <div className="view-mode" onDoubleClick={() => setIsEditing(true)}>
              <h3 className="task-title">{task.title}</h3>
              <div className="task-meta">
                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
                <span className="category-tag">
                  <Tag size={12} />
                  {task.category}
                </span>
                {task.dueDate && (
                  <span className={`due-date ${isOverdue ? 'alert' : ''}`}>
                    <Calendar size={12} />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                <span className="created-at">
                  <Clock size={12} />
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="item-actions">
        {!isEditing && (
          <>
            <button 
              className="icon-btn edit" 
              onClick={() => setIsEditing(true)}
              title="Edit Task"
            >
              <Edit2 size={16} />
            </button>
            <button 
              className="icon-btn delete" 
              onClick={() => onDelete(task.id)}
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
