import React from 'react';
import {AccessDeniedScreen} from "../screens/AccessDeniedScreen";
import {connect} from "react-redux";
import {getUser} from "../../store/actions/auth";

export const Authorization = (allowedRoles) =>
    (WrappedComponent) => {
        class WithAuthorization extends React.Component {
            constructor(props) {
                super(props);
            }

            componentDidMount() {
                const {getUser} = this.props;

                getUser().then((action) => {
                    this.setState(()=>({
                        loading: false
                    }));
                });
            }

            render() {
                const {roles = []} = this.props.user;
                let status = false;

                roles.forEach((role) => {
                    status = allowedRoles.includes(role.name) || status;
                });

                if (status) {
                    return <WrappedComponent {...this.props} />;
                } else {
                    return <AccessDeniedScreen/>;
                }
            }
        }

        return connect(state => ({
            user: state.auth.user
        }), dispatch => ({
            getUser: () => dispatch(getUser())
        }))(WithAuthorization);
    };