import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Error from "../utility/Error";
import Field from "./Field";

export default class Form extends React.Component {

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
            newRecord: newRecord !== undefined ? newRecord : true,
            dataType,
            error: undefined,
        };

        this.setup();
    }

    getCurrentField(fields, key) {
        return fields.find((field) => {
            return field.name === key;
        });
    }

    setup() {

        if(this.state.data) {
            Object.keys(this.state.data).forEach((key) => {
                const field = this.getCurrentField(this.state.fields, key);

                if(field) {
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
                    if(field.name === key) {
                        field.value = value;
                    }

                    return field;
                })
            };
        });
    };

    getData () {
        let data = {};
        this.state.fields.forEach((field) => {
            data[field.name] = field.value;
        });

        return data;
    }

    onSubmit = (e) => {
        e.preventDefault();

        let hasError = false;

        let error = '';
        this.state.fields.forEach((field) => {
            if(!field.value) {
                error += `\nPlease set ${field.label}.`;
                this.setState(() => ({error}));
                hasError = true;
            }
        });

        if(!hasError) {
            this.setState(() => ({error: ''}));
            const data = this.getData();
            console.log(data);
            this.props.onSubmit({
                ...data
            });
        }
    };

    render() {
        return (
            <div>
                {
                    this.state.error && <Error error={this.state.error} />
                }
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        {
                            this.state.fields.map((field, index) => {
                                return (
                                    <div key={index} className="col">
                                        <div className="form-group">
                                            <Field {...field} onChange={this.onFieldChange} />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="row">
                        <div className="col pull-left">
                            <button className="btn btn-success">{this.state.newRecord ? 'Add' : 'Edit'} {this.state.dataType}</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}