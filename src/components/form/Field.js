import React from "react";
import {CheckboxList, Date, DateTime, DropDown, Input, TextArea, Time, Checkbox} from './inputs/inputs';
import {ErrorBlock} from "../utility/ErrorBlock";

export class Field extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            element: false
        };
    }

    componentDidMount() {
        this.setState(() => ({
            element: this.getElement()
        }));
    }

    getElement() {
        const {
            custom = (props) => {},
            type
        } = this.props;
        let element = undefined;
        switch (type) {
            case 'dropdown':
                element = <DropDown {...this.props} />;
                break;
            case 'checkbox':
                element = <Checkbox {...this.props} />;
                break;
            case 'checkboxlist':
                element = <CheckboxList {...this.props} />;
                break;
            case 'date':
                element = <Date {...this.props} />;
                break;
            case 'time':
                element = <Time {...this.props} />;
                break;
            case 'datetime':
                element = <DateTime {...this.props} />;
                break;
            case 'textarea':
                element = <TextArea {...this.props} />;
                break;
            case 'custom':
                element = custom(this.props);
                break;
            default:
                element = <Input {...this.props} />;
                break;
        }

        return element;
    }

    render() {
        return (
            <div>
                {this.state.element}
                {this.props.error && <ErrorBlock error={this.props.error}/>}
            </div>
        );
    }
}