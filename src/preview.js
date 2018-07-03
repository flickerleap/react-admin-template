import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {Root} from './Root';
import {links, routes} from "./routes/routes";
import {defaultAppConfig} from "./config/config";
import './helpers/iconLibrary';
import 'font-awesome/css/font-awesome.min.css';
import '../scss/app.scss';
import {headerMenuItems} from "./menus/headerMenuItems";

export const {store, persistor} = configureStore();

ReactDOM.render(<Root store={store} persistor={persistor} routes={routes}
                      headerMenuItems={headerMenuItems} links={links}
                      appConfig={defaultAppConfig}/>, document.getElementById('app'));