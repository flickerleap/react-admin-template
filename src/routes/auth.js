import {Login as LoginScreen} from "../components/screens/LoginScreen";
import {Logout as LogoutScreen} from "../components/screens/LogoutScreen";
import {ForgotPasswordScreen} from "../components/screens/ForgotPasswordScreen";
import {ResetPasswordScreen} from "../components/screens/ResetPasswordScreen";

export const auth = [
    {
        path: '/login',
        component: LoginScreen,
        exact: true,
        isPublic: true
    },
    {
        path: '/logout',
        component: LogoutScreen,
        exact: true,
        isPublic: false
    },
    {
        path: '/forgot/password',
        component: ForgotPasswordScreen,
        exact: true,
        isPublic: true
    },
    {
        path: '/password/reset',
        component: ResetPasswordScreen,
        isPublic: true,
        exact: true
    }
];