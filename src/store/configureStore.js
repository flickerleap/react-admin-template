import { createStore, combineReducers } from 'redux';
import { fakeReducer } from "./reducers/reducers";

const rootReducer = combineReducers({
    fakeReducer: fakeReducer
})

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;
