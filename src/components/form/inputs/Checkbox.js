import React from 'react';

export class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.value = nextProps.value;

        return state;
    }

    getEventObject = (value) => {
        return {
            target: {
                name: this.props.name,
                value: value
            }
        };
    };

    onChange = (event) => {
        this.setState((prevState) => {
            const value = !prevState.value;
            this.props.onChange(this.getEventObject(value));

            return {
                value
            };
        });
    };

    render() {
        const {
            name, label, className = "form-control col-md-4", value
        } = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="row">
                    <div className={className}>
                        <input
                            onChange={this.onChange}
                            id={name}
                            name={name}
                            type="checkbox"
                            value={value}
                            defaultChecked={value}
                        />
                        <span> {label}</span>
                    </div>
                </div>
            </div>
        );
    }
}