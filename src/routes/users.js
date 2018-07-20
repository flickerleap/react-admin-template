import AddUserScreen from "../screens/User/AddUserScreen";
import IndexUserScreen from "../screens/User/IndexUserScreen";
import EditUserScreen from "../screens/User/EditUserScreen";

export const users = [
    {
        path:'/users/',
        component: IndexUserScreen,
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