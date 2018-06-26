import React from 'react';
import {Field} from "./Field";
import {validateFields} from "../../helpers/validate";

export class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
        const {
            data = undefined,
            fields = [],
            newRecord = true,
            dataType = ''
        } = this.props;

        this.state = {
            data,
            fields,
            newRecord,
            dataType
        };
    }

    componentDidMount() {
        this.setState((prevState) => ({
            fields: prevState.fields.map((field) => {
                field.show = this.showField(field);
                if (prevState.data && prevState.data[field.name]) {
                    if(field.form && field.form.valueFn) {
                        field.value = field.form.valueFn(prevState.data);
                    } else {
                        field.value = prevState.data[field.name];
                    }
                }

                return field;
            })
        }));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        if (nextProps.errors || (Array.isArray(nextProps.errors) && nextProps.errors.length > 0)) {
            state = {
                ...prevState,
                fields: prevState.fields.map((field) => {
                    if (nextProps.errors[field.name]) {
                        field.error = nextProps.errors[field.name][0];
                    }

                    return field;
                })
            };
        }

        return state;
    }

    getCurrentField(fields, key) {
        return fields.find((field) => {
            return field.name === key;
        });
    }

    onFieldChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.setState((prevState) => {
            const fields = prevState.fields.map((field) => {
                if (field.name === key) {
                    field.value = value;
                }

                return field;
            });
            const errors = validateFields(fields);

            return {
                fields: fields.map((field) => {
                    if (field.name === key) {
                        field.error = (errors && errors[field.name]) ? errors[field.name][0] : null;
                    }

                    return field;
                })
            };
        });
    };

    getData() {
        let data = {};
        this.state.fields.forEach((field) => {
            data[field.name] = field.value;
        });

        return data;
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.validateForm();

        if (!this.hasErrors()) {
            const data = this.getData();
            this.clear();
            this.props.onSubmit(data);
        }
    };

    clear = () => {
        this.setState((prevState)=>({
            fields: prevState.fields.map((field)=>{
                field.value = field.defaultValue ? field.defaultValue : '';

                return field;
            })
        }));
    };

    validate = (fieldName) => {
        this.setState((prevState) => ({
            fields: prevState.fields.map((field) => {
                if (field.name === fieldName)
                    field.error = validateField(field.name, field.value, field.validation);

                return field;
            })
        }));
    };

    validateForm = () => {
        const errors = validateFields(this.state.fields);
        if (errors) {
            this.setState((prevState) => ({
                fields: prevState.fields.map((field) => {
                    field.error = errors[field.name] ? errors[field.name][0] : null;

                    return field;
                })
            }));
        }
    };

    getColumnClass = (columns) => {
        const total = 12;
        const amount = total / columns;

        return `col-md-${amount}`;
    };

    showField = (field) => {
        if (field.conditional !== undefined) {
            return field.conditional(this.getData());
        }

        return true;
    };

    hasErrors() {
        let errorCount = 0;
        this.state.fields.forEach((field) => {
            if (field.error) {
                errorCount++;
            }
        });

        return errorCount > 0;
    }

    getDefaultSubmitLabel() {
        return this.state.newRecord ? 'Add' : 'Update' + this.state.dataType;
    }

    render() {
        const {columns = 2, submitLabel = this.getDefaultSubmitLabel()} = this.props;
        const columnClass = this.getColumnClass(columns);
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        {
                            this.state.fields.map((field, index) => {
                                field.onChange = field.onChange === undefined
                                    ? this.onFieldChange : field.onChange;
                                return field.show &&
                                    (
                                        <div key={index} className={columnClass}>
                                            <div className="form-group">
                                                <Field {...field}/>
                                            </div>
                                        </div>
                                    );
                            })
                        }
                    </div>
                    <div className="row">
                        <div className="col pull-left">
                            <button
                                className="btn btn-success">{submitLabel}</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}