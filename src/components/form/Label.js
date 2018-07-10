import React from 'react';

export const Label = ({name, label, required = true, requiredClass = "text-danger"}) => (
    <div>
        {
            label &&
            <label htmlFor={name}>
                {label}
                &nbsp;
                {required && <span className={requiredClass}>*</span>}
            </label>
        }
    </div>

);