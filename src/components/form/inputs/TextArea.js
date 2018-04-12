import React from 'react';

export const TextArea = ({name, label, value, onChange, className="form-control"}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <textarea
            name={name}
            className={className}
            value={value}
            onChange={onChange}
        >
        </textarea>
    </div>
);