import React from 'react';
import {Field} from "../form/Field";

export class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        const {
            data = undefined,
            fields = [],
        } = this.props;

        this.state = {
            data,
            fields,
            loading: true
        };
    }

    componentDidMount() {
        this.setState((prevState) => ({
            fields: prevState.fields.map((field) => {
                field.canFilter = this.setCanFilter(field);
                if (prevState.data && prevState.data[field.name]) {
                    field.value = prevState.data[field.name];
                }

                return field;
            }),
            loading: false
        }));
    }

    onFieldChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.setState((prevState) => ({
            fields: prevState.fields.map((field) => {
                if (field.name === key) {
                    field.value = value;
                }

                return field;
            })
        }));
    };

    onFilter = (event) => {
        event.preventDefault();
        const data = {};
        this.state.fields.forEach((field) => {
            if (field.value) {
                data[field.name] = field.value
            }
        });

        this.props.onFilter(data);
    };

    onReset = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({
            ...prevState,
            fields: prevState.fields.map((field) => {
                field.value = field.defaultValue ? undefined : '';
                return field;
            })
        }));
    };

    setCanFilter = (field) => {
        if (field.canFilter !== undefined) {
            return field.canFilter;
        }

        return true;
    };

    render() {
        return (
            <tr>
                {
                    this.state.fields.map((field, index) => {
                        return field.canFilter ?
                            (
                                <td className="filter-cell" key={index}>
                                    <Field
                                        {...field}
                                        value={field.value}
                                        type={field.filterType ? field.filterType : field.type}
                                        onChange={this.onFieldChange}
                                        label={false}
                                    />
                                </td>
                            ) : (
                                <td className="filter-cell" key={index}>

                                </td>
                            );
                    })
                }
                <td className="filter-cell">
                    <div>
                        <a href="#" className="btn btn-primary" onClick={this.onFilter}>Filter</a>
                        <a href="#" className="btn btn-danger" onClick={this.onReset}>Reset</a>
                    </div>
                </td>
            </tr>
        );
    };
}