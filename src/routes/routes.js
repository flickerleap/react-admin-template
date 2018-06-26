import {DashboardScreen} from "../components/screens/DashboardScreen";
import {NotFoundScreen} from "../components/screens/NotFoundScreen";

import {auth} from "./auth";
import {exampleModel} from "../models/models";
import {examples} from "./examples";

export const routes = [
    {
        path: '/',
        component: DashboardScreen,
        isPublic: true,
        exact: true
    }
];

routes.push(...auth, ...examples);
routes.push({component: NotFoundScreen});

export const links = [
    {
        name: 'Dashboard',
        url: '/',
        icon: 'fa fa-tachometer',
        badge: {
            variant: 'info',
            text: 'NEW'
        }
    }
];

links.push(...exampleModel.getLinks());