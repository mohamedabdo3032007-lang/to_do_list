import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import type { FilterStatus, SortOption } from '../types';
import './FilterBar.css';

interface FilterBarProps {
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  search: string;
  setSearch: (search: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  setFilter,
  sort,
  setSort,
  search,
  setSearch,
}) => {
  return (
    <div className="filter-bar animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-controls">
        <div className="status-tabs">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((s) => (
            <button
              key={s}
              className={`tab-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="sort-container">
          <ArrowUpDown size={16} className="sort-icon" />
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
