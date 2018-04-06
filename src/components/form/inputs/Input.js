import React from 'react';

export const Input = ({name, label, type, value, onChange, className="form-control"}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input
            name={name}
            className={className}
            type={type}
            value={value}
            onChange={onChange}
        />
    </div>
);