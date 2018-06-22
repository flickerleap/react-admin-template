import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AdminLayout} from './layouts/layouts';
import {PersistGate} from 'redux-persist/integration/react';
import {userNeedsAuthentication, userDoesNotNeedAuthentication} from "./helpers/authGuard";
import {Loading} from "./components/utility/Loading";

export class Root extends React.Component {
    constructor(props) {
        super(props);
    }

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
        const {store, persistor, routes = [], links = [], headerMenuItems = [], appConfig = {title: 'Admin'}} = this.props;

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
                                    headerMenuItems,
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