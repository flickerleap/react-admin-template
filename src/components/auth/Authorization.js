import React from 'react';

export const Authorization = (allowedRoles) =>
    (WrappedComponent) => {
        return class WithAuthorization extends React.Component {
            render() {
                const {role} = this.props.user;
                if (allowedRoles.includes(role)) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return <h1>Access Denied</h1>
                }
            }
        }
    };