// src/Column.js

import React from 'react';
import Ticket from './Ticket';
import './Column.css';

function Column({ title, tickets, selectedTickets, onSelectTicket }) {
  return (
    <div className="column">
      <div className="column-title">{title}</div>
      {tickets.map(ticket => (
        <Ticket 
          key={ticket.id} 
          ticket={ticket} 
          isSelected={selectedTickets.includes(ticket.id)} 
          onSelect={onSelectTicket} 
        />
      ))}
    </div>
  );
}

export default Column;
