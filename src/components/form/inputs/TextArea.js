import React from 'react';

export class TextArea extends React.Component {
    render() {
        const {name, label, value, onChange, className = "form-control"} = this.props;

        return (
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
    }
}