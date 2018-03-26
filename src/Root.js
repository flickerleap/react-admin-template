import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {AdminLayout} from './layouts/layouts';
import {PersistGate} from 'redux-persist/integration/react';
import {login} from "./store/actions/actions";
import {userNeedsAuthentication, userDoesNotNeedAuthentication} from "./helpers/authGuard";
import Loading from "./components/utility/Loading";

class Root extends React.Component {

    setComponentProps = (component, ...rest) => {
        const finalProps = Object.assign({}, ...rest);
        return (
            React.createElement(component, finalProps)
        );
    };

    processComponent = ({
        component,
        isPublic = false,
    }) => {
        if (!isPublic) {
            return userNeedsAuthentication(component);
        } else {
            return userDoesNotNeedAuthentication(component);
        }
    };

    render() {
        const {store, persistor, routes = [], links = [], appConfig = {title: 'Admin'}} = this.props;

        return (
            <Provider store={store}>
                <PersistGate loading={<Loading/>} persistor={persistor}>
                    <Router>
                        <Switch>
                            <Route path='/' render={(props) => {
                                return this.setComponentProps(AdminLayout, props, {
                                    routes,
                                    appConfig,
                                    links,
                                    getComponent: this.processComponent
                                });
                            }}/>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        );
    };
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.accessToken,
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken
});

const mapDispatchToProps = (dispatch) => ({
    login: ({accessToken, refreshToken}) => dispatch(login({accessToken, refreshToken}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);