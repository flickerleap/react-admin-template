import React from 'react';
import {getEventObject} from "../../../helpers/form";
import {Label} from "../Label";

export class Checkbox extends React.Component {
    getEventObject = (value) => {
        return {
            target: {
                name: this.props.name,
                value: value
            }
        };
    };

    onChange = (event) => {
        const value = !this.props.value;
        this.props.onChange(getEventObject(this.props.name, value));
    };

    render() {
        const {
            name, label, className = "form-control col-md-4", value = false
        } = this.props;

        return (
            <div>
                <Label {...this.props} />
                <div className="row">
                    <div className={className}>
                        <input
                            onChange={this.onChange}
                            id={name}
                            name={name}
                            type="checkbox"
                            value={value}
                            defaultChecked={value}
                        />
                        <span> {label}</span>
                    </div>
                </div>
            </div>
        );
    }
}