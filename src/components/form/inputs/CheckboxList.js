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
        if (this.props.value !== prevProps.value || this.props.items !== prevProps.items) {
            this.setState(() => ({
                values: this.getValuesArray()
            }));
        }
    }

    getEventObject = (values) => ({
        target: {
            name: this.props.name,
            value: values.reduce((list, value)=>{
                if(value.selected) {
                    list.push(value.value);
                }

                return list;
            }, [])
        }
    });

    onChange = (event) => {
        const value = event.target.value;
        this.setState((prevState) => {
            const values = prevState.values.map((item) => {
                if (item.value.toString() === value.toString()) {
                    item.selected = !item.selected;
                }

                return item;
            });

            this.props.onChange(this.getEventObject(values));

            return {
                values
            };
        });
    };

    getValuesArray() {
        let values = this.props.items.map((item) => {
          item.selected = false;

          return item;
        });

        if (Array.isArray(this.props.value)) {
            values = this.props.items.map((item) => {
                item.selected = !!this.props.value.includes(item.value);

                return item;
            });
        } else if (this.props.value) {
          values = this.props.items.map((item) => {
              item.selected = item.value.toString() === this.props.value.toString();

              return item;
          });
        }

        return values;
    }

    render() {
        const {
            name, className = "form-control col-md-4"
        } = this.props;

        return (
            <div>
                <Label {...this.props} />
                <div className="row">
                    {
                        this.state.values.map((item, index) => (
                            <div key={index} className={className}>
                                <input
                                    onChange={this.onChange}
                                    id={name + index}
                                    name={name}
                                    type="checkbox"
                                    value={item.value}
                                    checked={item.selected}
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
