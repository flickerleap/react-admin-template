import React from 'react';

export class DropDown extends React.Component {
    render() {
        const {
            name, label, className="form-control", items = []
        } = this.props;

        const value = this.props.value || (items.length > 0 ? items[0].value : '');

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <select
                    name={name}
                    className={className}
                    value={value}
                    onChange={this.props.onChange}
                >
                    {
                        items.map((item, index) => (
                            <option
                                key={index}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        ))
                    }
                </select>
            </div>
        );
    }
}