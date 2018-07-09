import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {getTimeFormatForMoment} from "../../../helpers/time";
import {getEventObject} from "../../../helpers/form";

export class Time extends React.Component {
    onChange = (time) => {
        const {format = 'HH:mm'} = this.props;
        const value = time ? time.format(format) : undefined;
        this.props.onChange(getEventObject(this.props.name, value));
    };

    render() {
        const {name, label, isClearable = false, interval = 15, format = 'HH:mm'} = this.props;

        const value = moment(getTimeFormatForMoment(this.props.value));

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={value}
                        onChange={this.onChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat={format}
                        timeIntervals={interval}
                        isClearable={isClearable}
                        dateFormat="LT"
                        timeCaption="Time"
                        withPortal />
                </div>
            </div>
        );
    }
}