import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {Root} from './Root';
import {routes, links} from "./routes/routes";
import {defaultAppConfig} from "./config/config";

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import React Dates Initialize Script
import 'react-dates/initialize';

import '../scss/app.scss';

export const {store, persistor} = configureStore();

ReactDOM.render(<Root store={store} persistor={persistor} routes={routes} links={links}
                      appConfig={defaultAppConfig}/>, document.getElementById('app'));