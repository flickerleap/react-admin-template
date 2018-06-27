import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {Root} from './Root';
import {links, routes} from "./routes/routes";
import {defaultAppConfig} from "./config/config";
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

import '../scss/app.scss';

export const {store, persistor} = configureStore();

const headerMenuItems = [
    {
        name: 'Home',
        url: '/',
        icon: 'fas fa-house'
    },
    {
        name: <i className="fa fa-user"></i>,
        url: '#',
        children: [
            {
                name: 'Edit profile',
                url: '/profile/:id',
                icon: 'fa fa-user-edit',
                toBind: [
                    {
                        key: ':id',
                        valueFn: ({user}) => {
                            return user.id;
                        }
                    }
                ]
            },
            {
                name: 'Logout',
                url: '/logout',
                icon: 'fa fa-sign-out-alt'
            },
        ]
    }
];

ReactDOM.render(<Root store={store} persistor={persistor} routes={routes}
                      headerMenuItems={headerMenuItems} links={links}
                      appConfig={defaultAppConfig}/>, document.getElementById('app'));