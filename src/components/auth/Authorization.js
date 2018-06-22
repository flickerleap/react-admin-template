import React from 'react';
import {AccessDeniedScreen} from "../screens/AccessDeniedScreen";
import {connect} from "react-redux";

export const Authorization = () => {
     return (WrappedComponent) => {
        class WithAuthorization extends React.Component {
            constructor(props) {
                super(props);
            }

            render() {
                const {roles = []} = this.props.user;
                let status = false;

                roles.forEach((role) => {
                    //status = allowedRoles.includes(role.name) || status;
                });

                if (status) {
                    return <WrappedComponent {...this.props} />;
                } else {
                    return <AccessDeniedScreen/>;
                }
            }
        }

        return connect(state => {
            return {
                user: state.auth.user
            };
        })(WithAuthorization);
    };
};