import React from 'react';

export const DropDown = ({name, label, value, onChange, className="form-control", items = [], nameField='name'}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <select
            name={name}
            className={className}
            value={value}
            onChange={onChange}
        >
            {
                items.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}
                    >
                        {item[nameField]}
                    </option>
                ))
            }
        </select>
    </div>
);