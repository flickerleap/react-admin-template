import React from 'react';

export class CheckboxList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.value ? CheckboxList.setValues(this.props.items, [], props.value)
                : this.props.items.map(() => undefined)
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const state = prevState;
        state.values = CheckboxList.setValues(nextProps.items, state.values, nextProps.value);

        return state;
    }

    static setValues(items, currentValues = [], newValues = []) {
        let valueList = currentValues;

        newValues.map((value) => {
            const index = CheckboxList.getIndexOfValue(items, value);
            valueList[index] = value;
        });

        return valueList;
    }

    static getIndexOfValue = (items, value) => {
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
        const index = CheckboxList.getIndexOfValue(this.props.items, event.target.value);
        const values = this.state.values;
        values[index] = values.includes(value) ? undefined : value;

        this.setState(() => ({
            values
        }));

        this.props.onChange(this.getEventObject(values));
    };

    isSelected = (index) => {
        return this.state.values[index] !== undefined;
    };

    render() {
        const {
            name, label, className = "form-control col-md-4", items = []
        } = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="row">
                    {
                        items.map((item, index) => {
                            console.log(this.isSelected(index));
                            return (
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
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}