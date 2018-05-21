import AddExampleScreen from "../screens/Example/AddExampleScreen";
import ExampleScreen from "../screens/Example/ExampleScreen";

export const examples = [
    {
        path:'/examples/',
        component: ExampleScreen,
        isPublic: true,
    },
    {
        path:'/examples/add',
        component: AddExampleScreen,
        isPublic: true,
    }
];