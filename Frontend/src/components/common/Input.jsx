import React from 'react';
import '../../styles/Input.css'

const Input = ({ label, type ='text', value, onChange,error, ...props }) => {
return(
    <div className="input-group">
         {label && <label htmlFor={props.id}>{label}</label>}
         <input
            type={type}
            value={value}
            onChange={onChange}
            className={error ? 'input-error' : ''}
            {...props}
            />
            {error && <span className="error-message">{error}</span>}
    </div>
);
};

export default Input;

// resuable input component with label and error handling