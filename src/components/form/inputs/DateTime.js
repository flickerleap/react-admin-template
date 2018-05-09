import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {timestamp} from '../../../helpers/time';

export class DateTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            datetime: moment(this.props.value)
        };
    }

    componentDidMount() {
        this.onChange(this.state.datetime);
    }

    onFocusChanged = ({focused}) => {
        this.setState(() => ({focused: focused}));
    };

    onChange = (datetime) => {
        const event = {
            target: {
                name: this.props.name,
                value: timestamp(datetime)
            }
        };

        this.setState(() => ({
            datetime
        }));

        this.props.onChange(event);
    };

    render() {
        const {name, label, format="YYYY-MM-DD", interval=15} = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    <DatePicker
                        selected={this.state.datetime}
                        onChange={this.onChange}
                        dateFormat={format}
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