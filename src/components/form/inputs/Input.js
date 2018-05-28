import React from 'react';

export class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.value = nextProps.value;

        return state;
    }

    onChange = (event) => {
        const value = event.target.value;
        this.setState(()=>({
            value
        }));
        this.props.onChange(event);
    };

    render() {
        const {name, label, type, className="form-control"} = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <input
                    name={name}
                    className={className}
                    type={type}
                    value={this.state.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}