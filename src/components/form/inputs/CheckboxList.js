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

    static setValues(items, values, value) {
        if (Array.isArray(value)) {
            values = value;
        }
        else {
            const index = CheckboxList.getIndexOfValue(items, value);
            if (index < 0 && values[index] === undefined) {
                values[index] = value;
            }
        }

        return values;
    }

    getEventObject = (value) => {
        return {
            target: {
                name: this.props.name,
                value: value
            }
        };
    };

    static getIndexOfValue = (items, value) => {
        return items.findIndex((item) => {
            return item.value === value;
        });
    };

    onChange = (event) => {
        const value = event.target.value;
        const index = CheckboxList.getIndexOfValue(this.props.items, value);
        const values = this.state.values;

        if (values.includes(value)) {
            values[index] = undefined;
        } else {
            values[index] = value;
        }

        this.props.onChange(this.getEventObject(values));

        this.setState(() => ({
            values
        }));
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
                        items.map((item, index) => (
                            <div key={index} className={className}>
                                <input
                                    onChange={this.onChange}
                                    id={name + index} name={name}
                                    type="checkbox" value={item.value}
                                    checked={this.isSelected(index)}/>
                                <span> {item.label}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}