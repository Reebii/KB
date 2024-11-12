// src/Display.js

import React from 'react';
import './Display.css';

function Display({ grouping, setGrouping, sorting, setSorting, selectedCount, totalTickets, onSelectAll }) {
  const isAllSelected = selectedCount === totalTickets && totalTickets > 0;

  return (
    <div className="display-menu">
      <div className="selection-controls">
        <input 
          type="checkbox" 
          checked={isAllSelected} 
          onChange={onSelectAll} 
          className="select-all-checkbox"
        />
        <label>Select All</label>
      </div>
      <div className="controls">
        <label>
          Group by:
          <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
            <option value="status">Status</option>
            <option value="assignedUser">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Sort by:
          <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Display;
