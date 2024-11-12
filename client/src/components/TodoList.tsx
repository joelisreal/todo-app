import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = () => {
        // Fetch todos from the backend
        fetch('http://localhost:5000/todos')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleToggle = (id: number) => {
        // Find the todo item by its ID
        const todo = todos.find(todo => todo.id === id);
    
        if (todo) {
            // Toggle the completed status of the found todo
            axios.put(`http://localhost:5000/todos/${id}`, { completed: !todo.completed })
                .then((response: AxiosResponse<Todo>) => {
                    // Update the state with the updated todo from the server
                    setTodos(todos.map(todo => 
                        todo.id === id ? response.data : todo
                    ));
                })
                .catch((error:AxiosError) => console.error('Error toggling todo:', error));
        }
    };
    

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        onToggle={() => handleToggle(todo.id)}
                        onDelete={() => handleDelete(todo.id)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;