import React from 'react';

export class CheckboxList extends React.Component {
    getValues(currentValues = [], newValues = []) {
        let valueList = currentValues;

        newValues.map((value) => {
            const index = this.getIndexOfValue(this.props.items, value);
            valueList[index] = value;
        });

        return valueList;
    }

    getIndexOfValue = (items, value) => {
        return items.findIndex((item) => {
            return item.value === value;
        });
    };

    getEventObject = (value) => {
        return {
            target: {
                name: this.props.name,
                value: value
            }
        };
    };

    onChange = (event) => {
        const value = event.target.value;
        const index = this.getIndexOfValue(this.props.items, event.target.value);
        const values = this.props.value || [];
        values[index] = values.includes(value) ? undefined : value;

        this.props.onChange(this.getEventObject(values));
    };

    isSelected = (index) => {
        const values = this.getValues([], this.getValuesArray());
        return values[index] !== undefined;
    };

    getValuesArray() {
        return Array.isArray(this.props.value) ? this.props.value : [this.props.value];
    }

    render() {
        const {
            name, label, className = "form-control col-md-4", items = []
        } = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="row">
                    {
                        items.map((item, index) => (
                            <div key={index} className={className}>
                                <input
                                    onChange={this.onChange}
                                    id={name + index}
                                    name={name}
                                    type="checkbox"
                                    value={item.value}
                                    defaultChecked={this.isSelected(index)}
                                />
                                <span> {item.label}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}