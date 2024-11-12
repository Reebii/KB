// src/Board.js

import React, { useState, useEffect } from 'react';
import Column from './Column';
import Display from './Display';
import './Board.css';

function Board() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');
  const [selectedTickets, setSelectedTickets] = useState([]);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTickets(data);
        } else if (data && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error('Unexpected API response format:', data);
          setTickets([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setTickets([]);
      });
  }, []);

  const handleSelectTicket = (ticketId) => {
    setSelectedTickets(prevSelected => {
      if (prevSelected.includes(ticketId)) {
        return prevSelected.filter(id => id !== ticketId);
      } else {
        return [...prevSelected, ticketId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedTickets.length === tickets.length) {
      setSelectedTickets([]);
    } else {
      const allTicketIds = tickets.map(ticket => ticket.id);
      setSelectedTickets(allTicketIds);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedTickets.length === 0) return;

    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedTickets.length} selected ticket(s)?`);
    if (!confirmDelete) return;

    const updatedTickets = tickets.filter(ticket => !selectedTickets.includes(ticket.id));
    setTickets(updatedTickets);
    setSelectedTickets([]);
  };

  const getGroupedTickets = () => {
    if (!Array.isArray(tickets)) return {};

    let sortedTickets = [...tickets];
    if (sorting === 'priority') {
      sortedTickets.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    } else if (sorting === 'title') {
      sortedTickets.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    const grouped = {};
    sortedTickets.forEach(ticket => {
      const groupKey = ticket[grouping] || 'Uncategorized';
      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(ticket);
    });
    return grouped;
  };

  const groupedTickets = getGroupedTickets();
  const totalTickets = tickets.length;
  const selectedCount = selectedTickets.length;

  return (
    <div className="board">
      <Display 
        grouping={grouping} 
        setGrouping={setGrouping} 
        sorting={sorting} 
        setSorting={setSorting} 
        selectedCount={selectedCount}
        totalTickets={totalTickets}
        onSelectAll={handleSelectAll}
      />
      {selectedCount > 0 && (
        <div className="bulk-actions">
          <button onClick={handleDeleteSelected} className="delete-button">
            Delete Selected
          </button>
          {/* Add more bulk action buttons here */}
        </div>
      )}
      <div className="columns">
        {Object.keys(groupedTickets).map(group => (
          <Column 
            key={group} 
            title={group} 
            tickets={groupedTickets[group]} 
            selectedTickets={selectedTickets}
            onSelectTicket={handleSelectTicket}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
