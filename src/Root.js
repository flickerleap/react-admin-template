import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AdminLayout } from './layouts/layouts';

class Root extends React.Component {

    setComponentProps = (component, ...rest) => {
        const finalProps = Object.assign({}, ...rest);
        return (
            React.createElement(component, finalProps)
        );
    };

    render() {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <Switch>
                        <Route path='/' render={(props) => {
                            return this.setComponentProps(AdminLayout, props, {routes: this.props.routes});
                        }} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default Root;