import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {timestamp} from '../../../helpers/time';
import {getEventObject} from "../../../helpers/form";

export class Date extends React.Component {
    onChange = (date) => {
        const value = date ? date.format('YYYY-MM-DD') : undefined;
        this.props.onChange(getEventObject(this.props.name, value));
    };

    render() {
        const {name, label, isClearable = false, format="YYYY-MM-DD"} = this.props;

        const value = moment(this.props.value);

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={value}
                        onChange={this.onChange}
                        dateFormat={format}
                        isClearable={isClearable}
                        placeholderText="None"
                        withPortal
                    />
                </div>
            </div>
        );
    }
}