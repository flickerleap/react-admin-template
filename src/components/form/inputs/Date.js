import React from 'react';
import {SingleDatePicker} from 'react-dates';

export class Date extends React.Component {
    state = {
        focused: false
    };

    onFocusChanged = ({focused}) => {
        this.setState(() => ({focused: focused}));
    };

    onChange = (date) => {
        const event = {
            target: {
                name: this.props.name,
                value: date
            }
        };
        this.props.onChange(event);
    };

    render() {
        const {name, label, value, numberOfMonths = 1} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <SingleDatePicker
                    date={value} // momentPropTypes.momentObj or null
                    onDateChange={this.onChange} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={this.onFocusChanged} // PropTypes.func.isRequired
                    numberOfMonths={numberOfMonths}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }
}