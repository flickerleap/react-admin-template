import React from 'react';
import {Field} from "./Field";
import {validateField} from "../../helpers/validate";

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
                return field;
            })
        }));

        this.setInitialData();
    }

    getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors) {
            console.log(nextProps.errors);
            this.setState(prevState => ({
                fields: prevState.fields.map((field) => {
                    if (nextProps.errors[field.name]) {
                        field.error = nextProps.errors[field.name][0];
                    }
                    return field;
                })
            }));
        }
    }

    getCurrentField(fields, key) {
        return fields.find((field) => {
            return field.name === key;
        });
    }

    setInitialData() {
        if (this.state.data) {
            Object.keys(this.state.data).forEach((key) => {
                const field = this.getCurrentField(this.state.fields, key);

                if (field) {
                    field.value = this.state.data[key];
                }
            });
        }
    }

    onFieldChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.setState((prevState) => {
            return {
                fields: prevState.fields.map((field) => {
                    if (field.name === key) {
                        field.value = value;
                    }

                    return field;
                })
            };
        });
        this.validate(key);
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
            this.props.onSubmit(data);
        }
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
        this.setState((prevState) => ({
            fields: prevState.fields.map((field) => {
                field.error = validateField(field.name, field.value, field.validation);

                return field;
            })
        }));
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
                                return field.show &&
                                    (
                                        <div key={index} className={columnClass}>
                                            <div className="form-group">
                                                <Field {...field} onChange={this.onFieldChange}/>
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