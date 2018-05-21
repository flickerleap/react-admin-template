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

    getData = (key, value) => {
        let data = {};
        data[key] = value;

        return data;
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
                        return field.canFilter &&
                            (
                                <td key={index}>
                                    <Field
                                        {...field}
                                        type={field.filterType ? field.filterType : field.type}
                                        onChange={this.onFieldChange}
                                        label={false}
                                    />
                                </td>
                            );
                    })
                }
            </tr>
        );
    };
}