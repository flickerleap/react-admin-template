import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import configureStore from './store/configureStore';
import {Root} from './Root';
import './styles/app.scss';
import './styles/styles.scss';
import {routes, links} from "./routes/routes";

export const {store, persistor} = configureStore();

const appConfig = {
    title: 'Admin'
};

ReactDOM.render(<Root store={store} persistor={persistor} routes={routes} links={links}
                      appConfig={appConfig}/>, document.getElementById('app'));