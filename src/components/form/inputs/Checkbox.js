import React from 'react';

export class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || false
        };
    }

    componentDidMount() {
        this.props.onChange(this.getEventObject(this.props.value));
    }

    getEventObject = (value) => {
        return {
            target: {
                name: this.props.name,
                value: value
            }
        };
    };

    render() {
        const {
            name, label, className = "form-control col-md-4", value, onChange
        } = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="row">
                    <div className={className}>
                        <input
                            onChange={onChange}
                            id={name}
                            name={name}
                            type="checkbox"
                            value={value}
                            checked={value}
                        />
                        <span> {label}</span>
                    </div>
                </div>
            </div>
        );
    }
}