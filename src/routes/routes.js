import DashboardScreen from '../screens/DashboardScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

export const routes = [
    {
        path:'/',
        component: DashboardScreen,
        label: 'Dashboard',
        exact: true
    }
];

routes.push({ component: NotFoundScreen });