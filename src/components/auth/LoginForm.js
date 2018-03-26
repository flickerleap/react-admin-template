import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {Error} from "../utility/Error";
import {Field} from "../form/Field";

export class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            fields: [
                {
                    name: 'email',
                    value: '',
                    label: 'Email',
                    type: 'email'
                },
                {
                    name: 'password',
                    value: '',
                    label: 'Password',
                    type: 'password'
                }
            ],
            error: undefined,
        };
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
            this.props.onSubmit(data.email, data.password);
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
                            <button className="btn btn-success">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}