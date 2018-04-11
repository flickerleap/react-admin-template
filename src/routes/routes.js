import {DashboardScreen} from "../components/screens/DashboardScreen";
import {NotFoundScreen} from "../components/screens/NotFoundScreen";

import {auth} from "./auth";

export const routes = [
    {
        path: '/',
        component: DashboardScreen,
        label: 'Dashboard',
        exact: true
    }
];

routes.push(...auth);
routes.push({component: NotFoundScreen});

export const links = [
    {
        name: 'Dashboard',
        url: '/',
        icon: 'fa fa-tachometer',
        badge: {
            variant: 'info',
            text: 'NEW'
        },
        children: [
            {
                name: 'Dashboard',
                url: '/',
                icon: 'fa fa-tachometer',
            }
        ]
    }
];