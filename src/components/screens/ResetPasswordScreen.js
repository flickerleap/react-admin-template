import React from 'react';
import {connect} from 'react-redux';
import {forgotPassword, getUser, login, resetPassword} from "../../store/actions/auth";
import {DynamicForm} from "../form/DynamicForm";
import {hasErrors} from "../../helpers/validate";

class ResetPasswordScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            fields: [
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
                        password: {
                            message: '^Please enter a valid password'
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
                    <h1>Reset Password</h1>
                    <DynamicForm
                        errors={this.state.errors}
                        fields={this.state.fields}
                        columns={2}
                        onSubmit={this.onLogin}
                        submitLabel='Login'
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (id, password) => dispatch(resetPassword(id, password))
});

export const Login = connect(undefined, mapDispatchToProps)(ResetPasswordScreen);