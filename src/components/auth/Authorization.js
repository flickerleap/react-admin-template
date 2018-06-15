import React from 'react';
import {AccessDeniedScreen} from "../screens/AccessDeniedScreen";

export const Authorization = (allowedRoles) =>
    (WrappedComponent) => {
        return class WithAuthorization extends React.Component {
            constructor(props) {
                super(props);
            }

            render() {
                const {roles} = this.props.user;
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
    };