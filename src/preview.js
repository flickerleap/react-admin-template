import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {Root} from './Root';
import {routes, links} from "./routes/routes";
import {defaultAppConfig} from "./config/config";

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

import '../scss/app.scss';

export const {store, persistor} = configureStore();

const roles = [];//['admin'];

const headerMenuItems = [
    {
        name: 'Home',
        url: '/'
    }
];

ReactDOM.render(<Root store={store} roles={roles} persistor={persistor} routes={routes} headerMenuItems={headerMenuItems} links={links}
                      appConfig={defaultAppConfig}/>, document.getElementById('app'));