import AddExampleScreen from "../screens/Example/AddExampleScreen";
import ExampleScreen from "../screens/Example/ExampleScreen";
import EditExampleScreen from "../screens/Example/EditExampleScreen";

export const examples = [
    {
        path:'/examples/',
        component: ExampleScreen,
        exact: true,
        isPublic: true,
    },
    {
        path:'/examples/add',
        component: AddExampleScreen,
        isPublic: true,
    },
    {
        path:'/examples/:id/edit',
        label: 'Update Site',
        component: EditExampleScreen,
        excludeFromNav: true,
        isPublic: true,
    }
];