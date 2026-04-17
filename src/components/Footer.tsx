import React from 'react';
import { Trash2 } from 'lucide-react';
import './Footer.css';

interface FooterProps {
  total: number;
  completed: number;
  active: number;
  onClearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({ total, completed, active, onClearCompleted }) => {
  if (total === 0) return null;

  return (
    <footer className="footer animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="footer-stats">
        <span className="stat-item">
          <strong>{active}</strong> items left
        </span>
        <span className="stat-divider"></span>
        <span className="stat-item">
          <strong>{completed}</strong> completed
        </span>
      </div>

      {completed > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          <Trash2 size={14} />
          Clear Completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
