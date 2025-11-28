import React from 'react';
import { useTodo } from '../context/TodoContext';
import { Tab, Tabs } from '@mui/material';

const filterOptions = [
  { label: 'All', value: 'all'},
  { label: 'Pending', value: 'pending'},
  { label: 'Completed', value: 'completed'}
];

export default function Header() {
  const { tasks, filter, setFilter } = useTodo();

  const completed = tasks.filter(el => el.status === 'completed').length;
  const total = tasks.length;

  const handleChange = (_, value) => {
    setFilter(value);
  };

  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Checklist Dashboard</h1>
        </div>
        <p className="text-sm text-slate-300" aria-live="polite">
          {completed} / {total} completed
        </p>
      </div>

      <div className="flex justify-center">
        <Tabs
          value={filter}
          onChange={handleChange}
          aria-label="Filter tasks by status"
        >
          {filterOptions.map(opt => (
            <Tab key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Tabs>
      </div>
    </header>
  )
};
