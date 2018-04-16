import React from 'react';

export const DropDown = ({name, label, value, onChange, className="form-control", items = [], nameField='name'}) => {

    const defaultValue = value || (items.length > 0 ? items[0].id : '');
    console.log(defaultValue);

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                className={className}
                value={defaultValue}
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
};