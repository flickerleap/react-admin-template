import React from 'react';

export class DropDown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value || (props.items.length > 0 ? props.items[0].id : '')
        };
    }

    componentDidMount() {
        this.props.onChange({
            target:{
                name: this.props.name,
                value: this.state.value
            }
        });
    }

    render() {
        const {
            name, label, onChange, className="form-control", items = [], nameField='name'
        } = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <select
                    name={name}
                    className={className}
                    value={this.state.value}
                    onChange={onChange}
                >
                    {
                        items.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item[nameField]}
                            </option>
                        ))
                    }
                </select>
            </div>
        );
    }
}