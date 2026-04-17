import React from 'react';
import './Header.css';

interface HeaderProps {
  percentComplete: number;
}

const Header: React.FC<HeaderProps> = ({ percentComplete }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header animate-fade-in">
      <div className="header-content">
        <div className="title-group">
          <h1 className="app-title">AbdoQuest</h1>
          <p className="current-date">{today}</p>
        </div>
        <div className="progress-container">
          <div className="progress-info">
            <span>Progress</span>
            <span>{percentComplete}%</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
