import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {timestamp} from '../../../helpers/time';

export class Date extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            date: moment(this.props.value)
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.date = moment(nextProps.value);

        return state;
    }

    onFocusChanged = ({focused}) => {
        this.setState(() => ({focused: focused}));
    };

    onChange = (date) => {
        const event = {
            target: {
                name: this.props.name,
                value: timestamp(date)
            }
        };

        this.setState(() => ({
            date
        }));

        this.props.onChange(event);
    };

    render() {
        const {name, label, format="YYYY-MM-DD"} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.onChange}
                        dateFormat={format}
                        withPortal
                    />
                </div>
            </div>
        );
    }
}