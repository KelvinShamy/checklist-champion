import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTodo } from '../context/TodoContext';
import { sanitizeTitle } from '../utils/helpers';

export default function TaskInput() {
  const [value, setValue] = useState('');
  const { addTask } = useTodo();

  const handleSubmit = e => {
    e.preventDefault();
    const cleaned = sanitizeTitle(value);
    if (!cleaned) return;
    addTask(cleaned);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <TextField
        label="New task"
        variant="outlined"
        size="small"
        fullWidth
        value={value}
        onChange={e => setValue(e.target.value)}
        inputProps={{ 'aria-label': 'Add new task title' }}
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
}
