import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {timestamp} from '../../../helpers/time';
import {getEventObject} from "../../../helpers/form";
import {Label} from "../Label";

export class DateTime extends React.Component {
    onChange = (datetime) => {
        const value = datetime ? timestamp(datetime) : undefined;
        this.props.onChange(getEventObject(this.props.name, value));
    };

    render() {
        const {name, label, isClearable = false, format="YYYY-MM-DD", interval=15} = this.props;

        const value = moment(this.props.value);

        return (
            <div>
                <Label {...this.props} />
                <div className="form-control">
                    <DatePicker
                        selected={value}
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