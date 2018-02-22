import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AdminLayout } from './layouts/layouts';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path='/' component={AdminLayout} />
        </Router>
    </Provider>
);

export default Root;