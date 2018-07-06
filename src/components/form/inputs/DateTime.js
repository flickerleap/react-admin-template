import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {timestamp} from '../../../helpers/time';

export class DateTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: moment(this.props.value)
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.value = moment(nextProps.value);

        return state;
    }

    onChange = (datetime) => {
        const event = {
            target: {
                name: this.props.name,
                value: datetime ? timestamp(datetime) : undefined
            }
        };

        this.setState(() => ({
            value: datetime
        }));

        this.props.onChange(event);
    };

    render() {
        const {name, label, isClearable = false, format="YYYY-MM-DD", interval=15} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={this.state.value}
                        onChange={this.onChange}
                        dateFormat={format}
                        isClearable={isClearable}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={interval}
                        timeCaption="time"
                        withPortal
                    />
                </div>
            </div>
        );
    }
}