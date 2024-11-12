
// src/Ticket.js

import React from 'react';
import './Ticket.css';

function Ticket({ ticket, isSelected, onSelect }) {
  const priorityColors = {
    4: '#ff4c4c', // Urgent
    3: '#ff9800', // High
    2: '#ffc107', // Medium
    1: '#8bc34a', // Low
    0: '#bdbdbd', // No priority
  };

  return (
    <div className="ticket">
      <div className="ticket-header">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(ticket.id)}
          className="ticket-checkbox"
        />
        <div className="ticket-id">{ticket.id}</div>
      </div>
      <div className="ticket-title">{ticket.title}</div>
      <div className="ticket-meta">
        <span
          className="ticket-priority"
          style={{ color: priorityColors[ticket.priority] }}
        >
          Priority: {["No priority", "Low", "Medium", "High", "Urgent"][ticket.priority]}
        </span>
        <div className="ticket-user" title={`Assigned to ${ticket.assignedUser}`}>
          {ticket.assignedUser}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
