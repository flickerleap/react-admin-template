import React from 'react';
import {Field} from "./Field";
import {FormModel} from "../../data/FormModel";

export class DynamicForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: this.getModel()
        };
    }

    componentDidMount() {
        const model = this.getModel(this.props.fields, this.props.data);
        this.setModel(model);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.errors !== prevProps.errors) {
            const model = prevState.model;
            model.setErrors(this.props.errors);
            this.setModel(model);
        }

        if (this.props.fields !== prevProps.fields) {
            const model = prevState.model;
            model.fields = model.getFields(this.props.fields);
            this.setModel(model);
        }

        if (this.props.data !== prevProps.data) {
            const model = prevState.model;
            model.load(this.props.data);
            this.setModel(model);
        }
    }

    getModel = (fields = [], data = undefined) => {
        return new FormModel({fields, data});
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
        const field = model.get(name);
        model.set(name, value);
        model.validate();
        this.setModel(model);

        if(field && field.onChange) {
            field.onChange(event);
        }
    };

    onSubmit = (event) => {
        event.preventDefault();

        this.validateForm();

        if (!this.state.model.hasErrors()) {
            const data = this.state.model.getReturnObject();
            this.props.onSubmit(data);
        }
    };

    validateForm = () => {
        const model = this.state.model;
        model.validate();
        this.setModel(model);
    };

    getColumnClass = (columns) => {
        const total = 12;
        const amount = total / columns;

        return `col-md-${amount}`;
    };

    getDefaultSubmitLabel() {
        const {newRecord = true, dataType = ""} = this.props;
        return newRecord ? 'Add ' : 'Update ' + dataType;
    }

    render() {
        const {
            columns = 2,
            submitLabel = this.getDefaultSubmitLabel()
        } = this.props;
        const columnClass = this.getColumnClass(columns);

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        {
                            this.state.model.fields.map((field, index) => {
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
                                className="btn btn-success"
                            >{submitLabel}</button>
                        </div>
                    </div>
                </form>
                <br/>
            </div>
        );
    };
}