import InputField from './components/InputField';
// import Button from './components/Button';
import TodoList from './components/TodoList';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <InputField onAdd={addTodo} />
      {/* <InputField value={input} onChange={(e) => setInput(e.target.value)} /> */}
      {/* <Button onClick={addTodo}>Add Todo</Button> */}
      <TodoList />
      {/* <TodoList todos={todos} /> */}
    </div>
  );
}

export default App;