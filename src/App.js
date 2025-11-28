import './App.css';
import { TodoProvider } from './context/TodoContext';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TodoList from './components/TodoList';

function App() {
  return (
    // This will be wrapped in the TodoProvider
    <div className="App">
      <Header />
      <TaskInput />
      <TodoList />
    </div>
  );
};

export default App;
