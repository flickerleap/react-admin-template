import React from 'react';

export class CheckboxList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.value || []
        };
    }

    componentDidMount() {
        this.props.onChange(this.getEventObject(this.state.values));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.values = nextProps.value;

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
        const index = parseInt(event.target.id.replace(this.props.name, ''));
        const value = event.target.value;

        const values = this.state.values;

        if(values.indexOf(value) > -1) {
            delete values[index];
        } else {
            values.splice(index, 0, value);
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
                                    id={name+index} name={name}
                                    type="checkbox" value={item.value}
                                    checked={this.isSelected(index)} />
                                <span> {item.label}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}