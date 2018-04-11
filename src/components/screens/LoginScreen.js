import React from 'react';
import {connect} from 'react-redux';
import {LoginForm} from "../auth/LoginForm";
import {login, getUser} from "../../store/actions/auth";


class LoginScreen extends React.Component {
    state = {
        errors: [],
        errorMessage: ''
    };

    onLogin = (email, password) => {
        this.props.login(email, password).then((action)=>{
            if(!this.hasErrors(action)) {
                this.props.getUser().then((action)=>{
                    if(!this.hasErrors(action))  {
                        this.props.history.push("/");
                    }
                });
            }
        });
    };

    hasErrors = (action) => {
        if(contains(action.type, 'FAILURE')) {
            action.payload.response.then((data)=>{
                this.setState(()=>({
                    errors: data.errors,
                    errorMessage: data.message
                }));
            });
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
                    <LoginForm errors={this.state.errors} onSubmit={this.onLogin}/>
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