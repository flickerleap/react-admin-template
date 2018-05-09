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

    componentDidMount() {
        this.onChange(this.state.time);
    }

    onFocusChanged = ({focused}) => {
        this.setState(() => ({focused: focused}));
    };

    onChange = (time) => {
        const event = {
            target: {
                name: this.props.name,
                value: timestamp(time)
            }
        };

        this.setState(() => ({
            time
        }));

        this.props.onChange(event);
    };

    render() {
        const {name, label} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={this.state.time}
                        onChange={this.onChange}
                        showTimeSelect
                        dateFormat="LLL" />
                </div>
            </div>
        );
    }
}