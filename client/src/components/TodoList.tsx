import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: string[];
}

const TodoList: React.FC<TaskListProps> = ( { tasks } ) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = () => {
        // Fetch todos from the backend
        fetch('http://localhost:5000/todos')
            .then(response => response.json())
            .then(data => {
                // Sort todos after fetching them
                const sortedTodos = sortTodos(data);
                setTodos(sortedTodos);
            })
            .catch(error => console.error('Error fetching todos:', error));
    };

    // Sort todos: uncompleted tasks first, then completed tasks
    const sortTodos = (todos: Todo[]) => {
        return todos.sort((a, b) => 
            a.completed === b.completed ? 0 : a.completed ? 1 : -1
        );
    };

    // the tasks array is passed as a dependency to the useEffect hook
    // this is so that the todo list re-renders when a new task is added
    useEffect(() => {
        fetchTodos();
    }, [tasks]);

    const handleToggle = (id: number) => {
        // Find the todo item by its ID
        const todo = todos.find(todo => todo.id === id);
    
        if (todo) {
            // Toggle the completed status of the found todo
            axios.put(`http://localhost:5000/todos/${id}`, { task:todo.task, completed: !todo.completed })
                .then((response: AxiosResponse<Todo>) => {
                    // After updating, reorder the todos array with completed tasks at the bottom
                    const updatedTodos = todos.map(todo => 
                        todo.id === id ? response.data : todo
                    );

                     // Sort todos again to ensure the order is maintained
                    const sortedTodos = sortTodos(updatedTodos);

                    // Update the state with the updated todos
                    setTodos(sortedTodos);
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

    const handleEdit = async (id: number, task: string) => {
        try {
            // Find the todo item by its ID
            const todo = todos.find(todo => todo.id === id);
            if (todo) {
                const response = await axios.put(`http://localhost:5000/todos/${id}`, { task: task, completed: todo.completed });
                
                // Get the updated todo from the response data
                const updatedTodo = response.data;
                setTodos(todos.map(todo => 
                    todo.id === id ? updatedTodo : todo
                ));
                }
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    };

    const moveTodo = (id: number, direction: 'up' | 'down') => {
        const index = todos.findIndex(todo => todo.id === id);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= todos.length) return;

        // Prevent moving uncompleted tasks below completed tasks
        const targetTodo = todos[newIndex];
        if (!todos[index].completed && targetTodo.completed && direction == 'down') return;

        // Move the todo item to the new index
        const updatedTodos = [...todos];
        const [movedTodo] = updatedTodos.splice(index, 1);
        updatedTodos.splice(newIndex, 0, movedTodo);

        setTodos(updatedTodos);
    };

    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        id={todo.id}
                        task={todo.task}
                        completed={todo.completed}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onMoveUp = {() => moveTodo(todo.id, 'up')}
                        onMoveDown = {() => moveTodo(todo.id, 'down')}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;