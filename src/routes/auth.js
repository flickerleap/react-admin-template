import {Login as LoginScreen} from "../components/screens/LoginScreen";
import {Logout as LogoutScreen} from "../components/screens/LogoutScreen";

export const auth = [
    {
        path:'/login',
        component: LoginScreen,
        exact: true,
        isPublic: true,
        excludeFromNav: true
    },
    {
        path:'/logout',
        component: LogoutScreen,
        exact: true,
        isPublic: false,
        excludeFromNav: true
    }
];