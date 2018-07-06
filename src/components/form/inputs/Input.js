import React from 'react';

export class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || undefined
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.value = nextProps.value;

        return state;
    }

    render() {
        const {name, label, type, onChange, className="form-control", attributes = {}} = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <input
                    name={name}
                    className={className}
                    type={type}
                    value={this.state.value}
                    onChange={onChange}
                    {...attributes}
                />
            </div>
        );
    }
}