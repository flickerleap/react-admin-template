import React from 'react';
import {Label} from "../Label";

export class CheckboxList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: []
        };
    }

    componentDidMount() {
        this.setState(() => ({
            values: this.getValuesArray()
        }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState(() => ({
                values: this.getValuesArray()
            }));
        }
    }

    getIndexOfValue = (items, value) => {
        return items.findIndex((item) => {
            return item.value === value;
        });
    };

    getEventObject = (values) => ({
        target: {
            name: this.props.name,
            value: values.filter((value)=>value !== undefined)
        }
    });

    onChange = (event) => {
        const value = event.target.value;
        const valueIndex = this.getIndexOfValue(this.props.items, event.target.value);
        this.setState((prevState) => {
            const data = {
                values: this.props.items.map((item, index) => {
                    if (index === valueIndex) {
                        return prevState.values.includes(value) ? undefined : value;
                    }

                    return prevState.values[index];
                })
            };

            this.props.onChange(this.getEventObject(data.values));

            return data;
        });
    };

    isSelected = (index) => {
        return this.state.values[index];
    };

    getValuesArray() {
        const values = [];
        if (Array.isArray(this.props.value)) {
            this.props.value.forEach((value) => {
                const index = this.getIndexOfValue(this.props.items, value.toString());
                values[index] = value.toString();
            });
        } else if (this.props.value) {
            values.push(this.props.value);
        }

        return values;
    }

    render() {
        const {
            name, className = "form-control col-md-4", items = []
        } = this.props;

        return (
            <div>
                <Label {...this.props} />
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