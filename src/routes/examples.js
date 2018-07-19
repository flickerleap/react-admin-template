import AddExampleScreen from "../screens/Example/AddExampleScreen";
import IndexExampleScreen from "../screens/Example/IndexExampleScreen";
import EditExampleScreen from "../screens/Example/EditExampleScreen";

export const examples = [
    {
        path:'/examples/',
        component: IndexExampleScreen,
        exact: true,
        isPublic: true,
    },
    {
        path:'/examples/add',
        component: AddExampleScreen,
        exact: true,
        isPublic: true,
    },
    {
        path:'/examples/:id/edit',
        component: EditExampleScreen,
        exact: true,
        isPublic: true,
    }
];