import React from "react";
import {Date, DateTime, DropDown, Input, Select, TextArea, Time} from './inputs/inputs';
import {ErrorBlock} from "../utility/ErrorBlock";

export class Field extends React.Component {
    constructor(props) {
        super(props);

        this.components = {
            dropdown: <DropDown {...props}/>,
            date: <Date {...props}/>,
            textarea: <TextArea {...props}/>,
            time: <Time {...props}/>,
            datetime: <DateTime {...props}/>,
            select: <Select {...props}/>,
            custom: (props) => props.custom(props)
        };
    }

    getComponent = (type) => {
        let component = this.components[type];
        if (component === undefined) {
            component = <Input  {...props}/>;
        }

        return component;
    };

    /*getElement() {
        let props = this.props;
        if(props.ref !== undefined) {
            delete props.ref;
        }
        return React.createElement(this.getComponent(this.props.type), this.props);
    }*/

    render() {
        const element = this.getComponent(this.props.type);

        return (
            <div>
                {element}
                {this.props.error && <ErrorBlock error={this.props.error}/>}
            </div>
        );
    }
}