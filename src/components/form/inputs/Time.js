import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {getTimeFormatForMoment} from "../../../helpers/time";

export class Time extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value ? moment(getTimeFormatForMoment(props.value)) : undefined
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.value = moment(getTimeFormatForMoment(nextProps.value));

        return state;
    }

    onChange = (time) => {
        const {format = 'HH:mm'} = this.props;
        const event = {
            target: {
                name: this.props.name,
                value: time ? time.format(format) : undefined
            }
        };

        this.setState(() => ({
            value: time
        }));

        this.props.onChange(event);
    };

    render() {
        const {name, label, isClearable = false, interval = 15, format = 'HH:mm'} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={this.state.value}
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