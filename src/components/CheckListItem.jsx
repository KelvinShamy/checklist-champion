import Checkbox from '@mui/material/Checkbox';
import { useTodo } from '../context/TodoContext';

export default function CheckListItem({ task }) {
  const { toggleTask, removeTask } = useTodo();

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleRemove = () => {
    removeTask(task.id);
  };

  const completed = task.status === 'completed';

  return (
    <li
      className={`flex items-center justify-between rounded-lg px-3 py-2 mb-2 transition-opacity duration-200 ${
        completed ? 'opacity-60 bg-slate-500' : 'bg-slate-500'
      }`}
    >
      <div className="flex items-center gap-2">
        <Checkbox
          checked={completed}
          onChange={handleToggle}
          inputProps={{ 'aria-label': `Toggle ${task.title}` }}
        />
        <span className={completed ? 'line-through text-slate-300' : ''}>
          {task.title}
        </span>
      </div>

      <button
        onClick={handleRemove}
        className="
          text-xs 
          px-2 py-1 
          rounded-md 
          bg-slate-600 
          text-white 
          hover:bg-slate-700 
          transition
        "
      >
        Remove
      </button>
    </li>
  );
};
