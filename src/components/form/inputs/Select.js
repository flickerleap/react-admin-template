import React from 'react';
import SelectComponent from 'react-select';

export class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || (props.items.length > 0 ? props.items[0].value : '')
        };
    }

    componentDidMount() {
        this.props.onChange(this.getEventObject(this.state.value));
    }

    getEventObject = (value) => {
        return {
            target: {
                name: this.props.name,
                value: value
            }
        };
    };

    onChange = (items) => {
        const {multipleItems = true} = this.props;
        const value = multipleItems ? items.map((item) => item.value) : items.value;

        this.setState(() => ({
            value
        }));

        this.props.onChange(this.getEventObject(value));
    };

    render() {
        const {
            name, label, multipleItems = true, className = "form-control", items = []
        } = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <SelectComponent
                    name={name}
                    className={className}
                    value={this.state.value}
                    onChange={this.onChange}
                    multi={multipleItems}
                    options={items}
                />
            </div>
        );
    }
}