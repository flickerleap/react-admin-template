import AddExampleScreen from "../screens/Example/AddExampleScreen";
import ExampleScreen from "../screens/Example/ExampleScreen";
import {Authorization} from "../components/auth/Authorization";

export const examples = [
    {
        path:'/examples/',
        component: Authorization()(ExampleScreen),
        exact: true,
        isPublic: true,
    },
    {
        path:'/examples/add',
        component: AddExampleScreen,
        isPublic: true,
    }
];