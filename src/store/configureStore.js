import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {apiMiddleware} from "../middleware/api";
import {authReducer, examplesReducer} from "./reducers/reducers";
import {reducer as refreshReducer} from 'redux-refresh-token';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    examples: examplesReducer,
    tokenRefresh: refreshReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk, apiMiddleware)));
    let persistor = persistStore(store);
    return {store, persistor};
};
