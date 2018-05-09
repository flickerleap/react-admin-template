import React from "react";
import {Date, DateTime, DropDown, Input, Select, TextArea, Time} from './inputs/inputs';
import {ErrorBlock} from "../utility/ErrorBlock";

export class Field extends React.Component {
    constructor(props) {
        super(props);

        this.components = {
            dropdown: DropDown,
            date: Date,
            textarea: TextArea,
            time: Time,
            datetime: DateTime,
            select: Select,
            custom: (props) => props.custom(props)
        };
    }

    getComponent = (type) => {
        let component = this.components[type];
        if (component === undefined) {
            component = Input;
        }

        return component;
    };

    getElement() {
        return React.createElement(this.getComponent(this.props.type), this.props);
    }

    render() {
        const element = this.getElement();

        return (
            <div>
                {element}
                {this.props.error && <ErrorBlock error={this.props.error}/>}
            </div>
        );
    }
}