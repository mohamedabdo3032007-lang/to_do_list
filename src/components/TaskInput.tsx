import React, { useState } from 'react';
import { Plus, Calendar, Flag } from 'lucide-react';
import type { Priority } from '../types';
import './TaskInput.css';

interface TaskInputProps {
  onAdd: (title: string, priority: Priority, category: string, dueDate?: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd(title, priority, category, dueDate || undefined);
    
    // Reset form
    setTitle('');
    setDueDate('');
  };

  return (
    <div className="task-input-container animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-main">
          <input
            type="text"
            className="title-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <button type="submit" className="add-button" disabled={!title.trim()}>
            <Plus size={20} />
            <span>Add Task</span>
          </button>
        </div>

        <div className="input-options">
          <div className="option-group">
            <label className="option-label">
              <Flag size={14} />
              Priority
            </label>
            <div className="priority-selector">
              {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`priority-btn ${p} ${priority === p ? 'active' : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label className="option-label">
              <Calendar size={14} />
              Due Date
            </label>
            <input
              type="date"
              className="date-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="option-group">
            <select 
              className="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
