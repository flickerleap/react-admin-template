import React from 'react';
import {connect} from 'react-redux';
import {LoginForm} from "../auth/LoginForm";
import {login, getUser} from "../../store/actions/auth";


class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
        };
    }

    onLogin = (email, password) => {
        this.props.login(email, password).then((action)=>{
            if(!this.hasErrors(action)) {
                this.props.getUser().then((action)=>{
                    if(!this.hasErrors(action))  {
                        this.props.history.push("/");
                    }
                }).catch((error) => {
                    this.setState(()=>({
                        errors: error.payload.response
                    }));
                });
            }
        });
    };

    hasErrors = (action) => {
        if(contains(action.type, 'FAILURE')) {
            const errors = action.payload.response;
            this.setState(()=>({
                errors: errors
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