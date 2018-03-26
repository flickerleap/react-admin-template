/** COMPONENTS */
/** AUTH */
import {LoginForm} from './components/auth/auth';

/** DATA */
import {ActionColumn, DataTable, Pagination} from "./components/data/data";

/** DISPLAY */
import {Card, List, ListItem} from "./components/display/display";

/** FORM */
import {Field, DynamicForm} from './components/form/form';

/** LAYOUT */
import {Header, Nav, Navbar} from "./components/layout/layout";

/** SCREENS */
import {ViewScreen, AddScreen,EditScreen, DashboardScreen, NotFoundScreen} from "./components/screens/screens";

/** UTILITY */
import {Loading, Error} from "./components/utility/utility";

/** HELPERS */
import {getUserFromStore} from './helpers/auth';
import {userNeedsAuthentication, userDoesNotNeedAuthentication} from './helpers/authGuard';
import {createFSAConverter} from './helpers/createFSAConverter';
import {get, set} from './helpers/storage';
import {contains} from './helpers/string';
import {now} from './helpers/time';

/** LAYOUTS */
import {AdminLayout} from "./layouts/layouts";

/** MIDDLEWARE */
import {apiMiddleware} from "./middleware/api";

/** STORE */
import {authReducer} from "./store/reducers/reducers";
import {
    login,
    logout,
    attemptTokenRefresh,
    getUser
} from './store/actions/actions';

/** ROOT */
import Root from './Root';

/** STYLES */
import 'styles/app.scss';