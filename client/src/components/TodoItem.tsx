import React, { useState } from 'react';
import Button from './Button';

interface TodoItemProps {
    id: number;
    task: string;
    completed: boolean;
    onToggle: (id: number) => void;
    onEdit: (id: number, task: string) => void;
    onDelete: (id: number) => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, task, completed, onToggle, onEdit, onDelete, onMoveUp, onMoveDown }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(task);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEdit(id, newTask);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center space-x-4 p-2 border-b">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                className="h-6 w-6 mr-4"
            />
            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="flex-1">
                    <input
                        type="text"
                        value={newTask}
                        onChange={handleEditChange}
                        className="border px-2 pw-1 w-full"
                    />
                </form>
            ) : (
                <span
                    className={`flex-1 ${completed ? "line-through text-gray-400" : ""}`}
                >
                    {task}
                </span>
            )}
            {!completed ?
            (<><Button onClick={onMoveUp} buttonType="move-up">⬆️</Button>
            <Button onClick={onMoveDown} buttonType="move-down">⬇️</Button></>)
            : null}
            <Button 
            onClick={() => {
                if (isEditing) {
                    handleEditSubmit; // Submit the form when editing
                    setIsEditing(false);
                } else {
                    setIsEditing(true); // Switch to editing mode when not editing
                }
            }} 
            buttonType={isEditing ? 'save' : 'edit'}>
                {isEditing ? 'Save' : 'Edit'}
            </Button>
            {/* <Button onClick={onMoveUp} buttonType="move-up">👆</Button>
            <Button onClick={onMoveDown} buttonType="move-down">👇</Button> */}
            <Button onClick={() => onDelete(id)} buttonType="delete">Delete</Button>
        </div>
    );
};

export default TodoItem;