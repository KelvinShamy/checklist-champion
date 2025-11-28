import { useTodo } from '../context/TodoContext';
import { filterTasks } from '../utils/helpers';
import CheckListItem from './CheckListItem';

export default function TodoList() {
  const { tasks, filter } = useTodo();
  const visible = filterTasks(tasks, filter);

  if (!visible.length) {
    return (
      <p className="text-sm text-slate-400 text-center mt-4">
        No tasks yet. Add something to get started.
      </p>
    );
  }

  return (
    <ul className="mt-2">
      {visible.map(task => (
        <CheckListItem key={task.id} task={task} />
      ))}
    </ul>
  );
}