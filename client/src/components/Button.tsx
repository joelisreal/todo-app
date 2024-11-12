import React from 'react';


interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
  }
  
const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className="todo-button">
            {children}
        </button>
    );
};

export default Button;