import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {timestamp} from '../../../helpers/time';

export class Date extends React.Component {
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

    onChange = (date) => {
        const event = {
            target: {
                name: this.props.name,
                value: date ? date.format('YYYY-MM-DD') : undefined
            }
        };

        this.setState(() => ({
            value: date
        }));

        this.props.onChange(event);
    };

    render() {
        const {name, label, isClearable = false, format="YYYY-MM-DD"} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={this.state.value}
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