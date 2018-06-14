import React from 'react';
import {connect} from 'react-redux';
import {getUser, login} from "../../store/actions/auth";
import {DynamicForm} from "../form/DynamicForm";
import {hasErrors} from "../../helpers/validate";
import {Link} from "react-router-dom";


class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            fields: [
                {
                    name: 'email',
                    value: '',
                    label: 'Email',
                    type: 'email',
                    validation: {
                        presence: {
                            allowEmpty: false,
                            message: '^Please enter an email address'
                        },
                        email: {
                            message: '^Please enter a valid email address'
                        }
                    }
                },
                {
                    name: 'password',
                    value: '',
                    label: 'Password',
                    type: 'password',
                    validation: {
                        presence: {
                            allowEmpty: false,
                            message: '^Please enter a password'
                        },
                        length: {
                            minimum: 5,
                            message: '^Your password must be at least 5 characters'
                        }
                    }
                }
            ]
        };
    }

    onLogin = ({email, password}) => {
        this.setState(() => ({
            loading: true
        }));
        this.props.login(email, password).then((action) => {
            if (!this.resultHasErrors(action)) {
                this.props.getUser().then((action) => {
                    this.setState(() => ({
                        loading: false
                    }));
                    if (!this.hasErrors(action)) {
                        this.props.history.push("/");
                    }
                }).catch((error) => {
                    this.setState(() => ({
                        loading: false,
                        errors: error.payload.response.errors
                    }));
                });
            }
            else {
                this.setState(() => ({
                    loading: false
                }));
            }
        }).catch((error) => {
            this.setState(() => ({
                loading: false,
                errors: error.payload.response.errors
            }));
        });
    };

    resultHasErrors = (action) => {
        if (hasErrors(action)) {
            this.setState(() => ({
                errors: action.payload.response.errors
            }));
            return true;
        }

        return false;
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <DynamicForm
                        errors={this.state.errors}
                        fields={this.state.fields}
                        columns={2}
                        onSubmit={this.onLogin}
                        submitLabel='Login'
                    />
                </div>
                <div className="col-md-12">
                    <Link className="btn btn-primary" to="/forgot/password">Forgot Password?</Link>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(login(email, password)),
    getUser: () => dispatch(getUser())
});

export const Login = connect(undefined, mapDispatchToProps)(LoginScreen);