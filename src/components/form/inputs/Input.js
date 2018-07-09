import React from 'react';

export class Input extends React.Component {
    render() {
        const {name, label, value = undefined, type, onChange, className="form-control", attributes = {}} = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <input
                    name={name}
                    className={className}
                    type={type}
                    value={value}
                    onChange={onChange}
                    {...attributes}
                />
            </div>
        );
    }
}