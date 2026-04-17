import { useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { useTasks } from './hooks/useTasks';
import type { FilterStatus, SortOption } from './types';
import './App.css';

function App() {
  const {
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
    getFilteredTasks,
    stats,
  } = useTasks();

  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sort, setSort] = useState<SortOption>('newest');
  const [search, setSearch] = useState('');

  const filteredTasks = getFilteredTasks(filter, sort, search);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <Header percentComplete={stats.percentComplete} />
        
        <main className="main-content">
          <TaskInput onAdd={addTask} />
          
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            search={search}
            setSearch={setSearch}
          />
          
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
          
          <Footer
            total={stats.total}
            completed={stats.completed}
            active={stats.active}
            onClearCompleted={clearCompleted}
          />
        </main>
      </div>
      
      {/* Decorative background elements */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
    </div>
  );
}

export default App;
