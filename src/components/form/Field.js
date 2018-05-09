import React from "react";
import {Input} from './inputs/Input';
import {DropDown} from "./inputs/DropDown";
import {Date} from "./inputs/Date";
import {TextArea} from "./inputs/TextArea";
import {Time} from "./inputs/Time";
import {ErrorBlock} from "../utility/ErrorBlock";
import {DateTime} from "./inputs/DateTime";

export class Field extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            custom = (props) => {
            }
        } = this.props;
        let element = undefined;
        switch (this.props.type) {
            case 'dropdown':
                element = <DropDown {...this.props} />;
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

        return (
            <div>
                {element}
                {this.props.error && <ErrorBlock error={this.props.error} classes={"error"} />}
            </div>
        );
    }
}