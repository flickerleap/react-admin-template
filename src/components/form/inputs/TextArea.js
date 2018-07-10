import React from 'react';
import {Label} from "../Label";

export class TextArea extends React.Component {
    render() {
        const {name, value, onChange, className = "form-control"} = this.props;

        return (
            <div>
                <Label {...this.props} />
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