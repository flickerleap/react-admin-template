import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {getTimeFormatForMoment} from "../../../helpers/time";
import {getEventObject} from "../../../helpers/form";
import {Label} from "../Label";

export class Time extends React.Component {
    onChange = (time) => {
        const {format = 'HH:mm'} = this.props;
        const value = time ? time.format(format) : undefined;
        this.props.onChange(getEventObject(this.props.name, value));
    };

    render() {
        const {isClearable = false, interval = 15, format = 'HH:mm'} = this.props;

        const value = moment(getTimeFormatForMoment(this.props.value));

        return (
            <div>
                <Label {...this.props} />
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