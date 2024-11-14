import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTodo = (task: string) => {
    if (task.trim()) {
      setTasks([...tasks, task]);
    }
  };

  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-center my-4 text-gray-800">Todo List</h1>
      <InputField onAdd={addTodo} />
      <TodoList tasks={tasks}/>
    </div>
  );
}

export default App;