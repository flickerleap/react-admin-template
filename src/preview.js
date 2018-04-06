import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import configureStore from './store/configureStore';
import {Root} from './Root';
import {routes, links} from "./routes/routes";
import {defaultAppConfig} from "./config/config";

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';


import '../scss/app.scss';
import 'react-dates/initialize';

export const {store, persistor} = configureStore();

ReactDOM.render(<Root store={store} persistor={persistor} routes={routes} links={links}
                      appConfig={defaultAppConfig}/>, document.getElementById('app'));