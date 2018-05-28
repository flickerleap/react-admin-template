import {ADD_EXAMPLE_SUCCESS, DELETE_EXAMPLE_SUCCESS, EDIT_EXAMPLE_SUCCESS, FETCH_EXAMPLES_SUCCESS} from "./actionTypes";

export const add = (data) => {
    return (dispatch) => new Promise((resolve) => {
        resolve(dispatch({
            type: ADD_EXAMPLE_SUCCESS,
            payload: {
                ...data
            }
        }));
    });
};

export const edit = ({id, ...rest}) => {
    return (dispatch) => new Promise((resolve) => {
        resolve(dispatch({
            type: EDIT_EXAMPLE_SUCCESS,
            payload: {
                id,
                ...rest
            }
        }))
    });
};

export const remove = (id) => {
    return (dispatch) => new Promise((resolve) => {
        resolve(dispatch({
            type: DELETE_EXAMPLE_SUCCESS,
            payload: {
                id
            }
        }));
    })
};

export const fetch = ({page = 1} = {}) => {
    return (dispatch) => new Promise((resolve) => {
        resolve(dispatch({
            type: FETCH_EXAMPLES_SUCCESS,
            payload: {
                data: []
            }
        }));
    });
};