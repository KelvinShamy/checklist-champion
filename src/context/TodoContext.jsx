import { createContext, useContext, useEffect, useReducer } from 'react';
import { loadTasksFromLS, saveTasksToLS } from '../utils/helpers';

const TodoContext = createContext(null);

const initialState = {
  // initial state is taken from localStorage
  tasks: loadTasksFromLS(),
  filter: 'all',
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const title = action.title.trim();
      if (!title) return state;

      const newTask = {
        id: crypto.randomUUID(),
        title,
        status: 'pending',
        createdAt: Date.now(),
      };

      return { ...state, tasks: [newTask, ...state.tasks] };
    }

    case 'REMOVE_TASK': {
      const tasks = state.tasks.filter(t => t.id !== action.id);
      return { ...state, tasks }
    }

    case 'TOGGLE_TASK': {
      const tasks = state.tasks.map(t =>
        t.id === action.id
          ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' }
          : t
      );
      return { ...state, tasks };
    }

    case 'SET_FILTER':
      return { ...state, filter: action.filter };

    default:
      return state;
  }
};

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    saveTasksToLS(state.tasks);
  }, [state.tasks]);

  const addTask = title => dispatch({ type: 'ADD_TASK', title });
  const removeTask = id => dispatch({type: 'REMOVE_TASK', id});
  const toggleTask = id => dispatch({ type: 'TOGGLE_TASK', id });
  const setFilter = filter => dispatch({ type: 'SET_FILTER', filter });

  const value = {
    tasks: state.tasks,
    filter: state.filter,
    addTask,
    removeTask,
    toggleTask,
    setFilter,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
