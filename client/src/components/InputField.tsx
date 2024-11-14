import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';

interface InputFieldProps {
    onAdd: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ onAdd }) => {
    const [task, setTask] = useState('');
    // const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
            await axios.post('http://localhost:5000/todos', { task });
            onAdd(task);
            setTask('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={task} 
                onChange={handleChange} 
                placeholder="Add a new task" 
            />
            <Button onClick={() => handleSubmit} buttonType="add">Add Todo</Button>
        </form>
    );
};

export default InputField;