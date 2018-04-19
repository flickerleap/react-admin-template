import React from 'react';
import {SingleDatePicker} from 'react-dates';
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

    componentDidMount() {
        this.onChange(this.state.date);
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
        const {name, label, numberOfMonths = 1} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <SingleDatePicker
                        date={this.state.date} // momentPropTypes.momentObj or null
                        onDateChange={this.onChange} // PropTypes.func.isRequired
                        focused={this.state.focused} // PropTypes.bool
                        onFocusChange={this.onFocusChanged} // PropTypes.func.isRequired
                        numberOfMonths={numberOfMonths}
                        isOutsideRange={() => false}
                    />
                </div>
            </div>
        );
    }
}