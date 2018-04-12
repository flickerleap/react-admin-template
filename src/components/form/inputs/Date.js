import React from 'react';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';

export class Date extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };
    }

    onFocusChanged = ({focused}) => {
        this.setState(() => ({focused: focused}));
    };

    onChange = (date) => {
        const event = {
            target: {
                name: this.props.name,
                value: date.format()
            }
        };
        this.props.onChange(event);
    };

    render() {
        const {name, label, numberOfMonths = 1} = this.props;
        const date = moment(this.props.value);
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <SingleDatePicker
                    date={date} // momentPropTypes.momentObj or null
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