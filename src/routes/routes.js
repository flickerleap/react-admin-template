import {DashboardScreen} from "../components/screens/DashboardScreen";
import {NotFoundScreen} from "../components/screens/NotFoundScreen";

import {auth} from "./auth";
import {exampleModel, userModel} from "../models/models";
import {examples} from "./examples";
import {users} from "./users";

export const routes = [
    {
        path: '/',
        component: DashboardScreen,
        isPublic: false,
        exact: true
    },
    ...auth, ...examples, users,
    {
        component: NotFoundScreen
    }
];

export const links = [
    {
        name: 'Dashboard',
        url: '/',
        icon: 'fas fa-tachometer-alt',
        badge: {
            variant: 'info',
            text: 'NEW'
        }
    }
];

links.push(...exampleModel.getLinks(), ...userModel.getLinks());