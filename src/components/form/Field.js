import React from "react";
import {Input} from './inputs/Input';
import {DropDown} from "./inputs/DropDown";
import {Date} from "./inputs/Date";

export class Field extends React.Component {
    render() {
        const {custom = (props)=>{}} = this.props;
        switch(this.props.type) {
            case 'dropdown':
                return <DropDown {...this.props} />;
            case 'date':
                return <Date {...this.props} />;
            case 'custom':
                return custom(this.props);
            default:
                return <Input {...this.props} />;
        }
    }
}