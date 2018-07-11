import AddUserScreen from "../screens/User/AddUserScreen";
import UserScreen from "../screens/User/UserScreen";
import EditUserScreen from "../screens/User/EditUserScreen";

export const users = [
    {
        path:'/users/',
        component: UserScreen,
        exact: true,
        isPublic: false,
    },
    {
        path:'/users/add',
        component: AddUserScreen,
        exact: true,
        isPublic: false,
    },
    {
        path:'/users/:id/edit',
        component: EditUserScreen,
        exact: true,
        isPublic: false,
    }
];