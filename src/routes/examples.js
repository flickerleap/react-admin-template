import AddExampleScreen from "../screens/Example/AddExampleScreen";
import ExampleScreen from "../screens/Example/ExampleScreen";
import EditExampleScreen from "../screens/Example/EditExampleScreen";
import {Authorization} from "../components/auth/Authorization";

export const examples = [
    {
        path: '/examples/',
        component: Authorization()(ExampleScreen),
        exact: true,
        isPublic: true,
    },
    {
        path: '/examples/add',
        component: AddExampleScreen,
        exact: true,
        isPublic: true,
    },
    {
        path: '/examples/:id/edit',
        component: EditExampleScreen,
        exact: true,
        isPublic: true,
    }
];