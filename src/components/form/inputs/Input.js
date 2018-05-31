import React from 'react';

export class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {value, name, label, type, onChange, className="form-control"} = this.props;

        return (
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
    }
}