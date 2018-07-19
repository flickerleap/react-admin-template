import React from 'react';
import {AccessDeniedScreen} from "../screens/AccessDeniedScreen";
import {connect} from "react-redux";
import {getUserFromState} from "../../helpers/auth";
import {canAccess, getAbilitiesFromLinks, getAbilitiesFromUser} from "../../helpers/authorization";

export const Authorization = (route) => {
     return (WrappedComponent) => {
        class WithAuthorization extends React.Component {
            constructor(props) {
                super(props);
            }

            render() {
                const userAbilities = getAbilitiesFromUser(this.props.user.abilities);
                const neededAbilities = getAbilitiesFromLinks([route]);

                status = canAccess(userAbilities, neededAbilities);

                if (status) {
                    return <WrappedComponent {...this.props} />;
                } else {
                    return <AccessDeniedScreen/>;
                }
            }
        }

        return connect(state => {
            return {
                user: getUserFromState(state)
            };
        })(WithAuthorization);
    };
};