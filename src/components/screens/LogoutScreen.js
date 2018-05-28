import React from 'react';
import {Redirect} from 'react-router-dom';
import {logout} from "../../store/actions/auth";
import {connect} from 'react-redux';

class LogoutScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Redirect to="/login"/>;
    };
}

const mapStateToProps = (state) => ({
    isAuthenticated: () => !!state.auth.accessToken
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);