import React from 'react';
import {Label} from "../Label";

export class Input extends React.Component {
    render() {
        const {name, value = undefined, type, onChange, className="form-control", attributes = {}} = this.props;

        return (
            <div>
                <Label {...this.props} />
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