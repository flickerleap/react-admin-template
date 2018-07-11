import React from 'react';
import {Field} from "../form/Field";
import {FormModel} from "../../data/FormModel";
import {DisplayModel} from "../../data/DisplayModel";
import {FilterModel} from "../../data/FilterModel";

export class FilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: this.getModel(this.props.fields)
        };
    }

    componentDidMount() {
        const model = this.getModel(this.props.fields);
        this.setModel(model);
    }

    componentDidUpdate(prevProps) {
        if(this.props.fields !== prevProps.fields) {
            const model = this.getModel(this.props.fields);
            this.setModel(model);
        }
    }

    getModel = (fields = []) => {
        return new FilterModel({fields});
    };

    setModel(model) {
        this.setState(() => ({
            model
        }));
    }

    onFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const model = this.state.model;
        model.set(name, value);
        this.setModel(model);
    };

    onFilter = (event) => {
        event.preventDefault();
        const data = {};
        this.state.model.fields.forEach((field) => {
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

        this.props.onFilter({});
    };

    render() {
        const {model} = this.state;

        return (
            <tr>
                {
                    model.fields.map((field, index) => {
                        return model.canFilter(field) ?
                            (
                                <td className="filter-cell" key={index}>
                                    <Field
                                        {...field}
                                        type={field.filter && field.filter.type ? field.filter.type : 'text'}
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
                    <div className="action-container">
                        <a href="#" className="btn btn-primary" onClick={this.onFilter}>Filter</a>
                        <a href="#" className="btn btn-danger" onClick={this.onReset}>Reset</a>
                    </div>
                </td>
            </tr>
        );
    };
}