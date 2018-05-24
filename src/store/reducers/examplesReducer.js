import {
    FETCH_EXAMPLES, FETCH_EXAMPLES_SUCCESS, FETCH_EXAMPLES_FAILURE,
    ADD_EXAMPLE_SUCCESS, DELETE_EXAMPLE_SUCCESS, EDIT_EXAMPLE_SUCCESS,ADD_EXAMPLE_FAILURE, EDIT_EXAMPLE_FAILURE
} from "../actions/actionTypes";

// Examples Reducer
const defaultState = {
    items:[],
    meta: {},
    links: {},
    error:undefined,
    loading:false,
};

export const reducer = (state = defaultState, action) => {
    let error = undefined;

    switch (action.type) {
        case ADD_EXAMPLE_SUCCESS:
            return {...state, items: [action.payload, ...state.items], error: null, loading: false };
        case ADD_EXAMPLE_FAILURE:
            error = action.payload.data || { message: action.payload.message };
            return {...state, items: state.items, error, loading: false };
        case EDIT_EXAMPLE_SUCCESS:
            return {...state, items: [action.payload, ...state.items], error: null, loading: false };
        case EDIT_EXAMPLE_FAILURE:
            error = action.payload.data || { message: action.payload.message };
            return {...state, items: state.items, error, loading: false };
        case DELETE_EXAMPLE_SUCCESS:
            const items = state.items.filter((item) => { return item.id !== action.payload.id });
            return {...state, items, error: null, loading: false };
        case FETCH_EXAMPLES:
            return {...state, items: [], error: undefined, loading:true };
        case FETCH_EXAMPLES_SUCCESS:
            return {...state, items: action.payload.data, error: undefined, loading:false, meta: action.payload.meta, links: action.payload.links };
        case FETCH_EXAMPLES_FAILURE:
            error = action.payload.data || { message: action.payload.message };
            return { ...state, items: [], error, loading: false };
        default:
            return state;
    }
};