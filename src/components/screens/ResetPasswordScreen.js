import React from 'react';
import {connect} from 'react-redux';
import {resetPassword} from "../../store/actions/auth";
import {DynamicForm} from "../form/DynamicForm";
import {hasErrors} from "../../helpers/validate";
import qs from "query-string";
import {Loading} from "../utility/Loading";

class Reset extends React.Component {
    constructor(props) {
        super(props);

        const params = qs.parse(this.props.history.location.search);

        this.state = {
            errors: [],
            token: Object.keys(params).length > 0 ? Object.keys(params)[0] : undefined,
            fields: [
                {
                    name: 'email',
                    value: '',
                    label: 'Email',
                    type: 'email',
                    validation: {
                        presence: {
                            allowEmpty: false,
                            message: '^Please enter an email'
                        },
                        email: {
                            message: '^Please enter a valid email'
                        }
                    },
                },{
                    name: 'password',
                    value: '',
                    label: 'Password',
                    type: 'password',
                    validation: {
                        length: {
                            minimum: 6
                        },
                        presence: {
                            allowEmpty: false,
                            message: '^Please enter a password'
                        }
                    },
                }, {
                    name: 'password_confirmation',
                    value: '',
                    label: 'Confirm Password',
                    type: 'password',
                    validation: {
                        length: {
                            minimum: 6
                        },
                        equality: "password",
                        presence: {
                            allowEmpty: false,
                            message: '^Please confirm your password'
                        }
                    }
                }
            ]
        };
    }

    onSubmit = (data) => {
        this.setState(() => ({
            loading: true
        }));
        data.token = this.state.token;
        this.props.resetPassword(data).then((action) => {
            if (!this.resultHasErrors(action)) {
                this.setState(() => ({
                    loading: false
                }));
                if (!this.hasErrors(action)) {
                    this.props.history.push("/login");
                }
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
                    {
                        this.state.loading ? <Loading active={this.state.loading}/>
                            :
                            <DynamicForm
                                errors={this.state.errors}
                                fields={this.state.fields}
                                columns={2}
                                onSubmit={this.onSubmit}
                                submitLabel='Login'
                            />
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (id, password) => dispatch(resetPassword(id, password))
});

export const ResetPasswordScreen = connect(undefined, mapDispatchToProps)(Reset);