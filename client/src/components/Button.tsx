import React from 'react';


interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    buttonType?: 'delete' | 'add' | 'save' | 'edit' | 'move-up' | 'move-down';
  }
  
const Button: React.FC<ButtonProps> = ({ onClick, children, buttonType }) => {
    const baseClasses = 'text-white font-semibold py-2 px-4 rounded-md transition-all';
    let buttonClasses = '';

    if (buttonType === 'delete') {
        buttonClasses = 'bg-red-500 hover:bg-red-600';
    } else if (buttonType === 'add') {
        buttonClasses = 'bg-green-500 hover:bg-green-600';
    } else if (buttonType === 'save') {
        buttonClasses = 'bg-blue-500 hover:bg-blue-600';
    } else if (buttonType === 'edit') {
        buttonClasses = 'bg-yellow-500 hover:bg-yellow-600';
    }

    return (
        <button onClick={onClick} 
        className={`${baseClasses} ${buttonClasses}`}>
            {children}
        </button>
    );
};

export default Button;