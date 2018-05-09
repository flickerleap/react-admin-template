import {GET_USER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "../actions/actionTypes";

/**
 *
 * @type {{accessToken: undefined, refreshToken: undefined, user: undefined}}
 */
const defaultState = {
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined
};

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                user: state.user
            };
        case LOGOUT_SUCCESS:
            return {
                accessToken: undefined,
                refreshToken: undefined,
                user: undefined
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};