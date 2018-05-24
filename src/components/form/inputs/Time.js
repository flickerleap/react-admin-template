import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {timestamp} from '../../../helpers/time';

export class Time extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            time: moment(this.props.value)
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.time = moment(nextProps.value);

        return state;
    }

    componentDidMount() {
        this.onChange(this.state.time);
    }

    onFocusChanged = ({focused}) => {
        this.setState(() => ({focused: focused}));
    };

    onChange = (time) => {
        const {format = 'HH:mm'} = this.props;
        const event = {
            target: {
                name: this.props.name,
                value: time.format(format)
            }
        };

        this.setState(() => ({
            time
        }));

        this.props.onChange(event);
    };

    render() {
        const {name, label, interval = 15, format = 'HH:mm'} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={this.state.time}
                        onChange={this.onChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat={format}
                        timeIntervals={interval}
                        dateFormat="LT"
                        timeCaption="Time"
                        withPortal />
                </div>
            </div>
        );
    }
}