import React from "react";
import '../../styles/Button.css';

const Button =({ children, onClick, type='button', className='', disabled = false}) => {
    return (
        <button 
        type={type}
        className={`btn ${className}`.trim()}
        onClick={onClick}
        disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
