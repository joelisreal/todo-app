import React, { useState } from 'react';
import Button from './Button';

interface InputFieldProps {
    onAdd: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ onAdd }) => {
    const [task, setTask] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
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
            <Button onClick={() => handleSubmit}>Add Todo</Button>
            {/* <button type="submit">Add</button> */}
        </form>
    );
};

export default InputField;