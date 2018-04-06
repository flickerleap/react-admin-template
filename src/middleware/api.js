import attemptRefresh from "redux-refresh-token";
import {createFSAConverter} from "../helpers/createFSAConverter";
import {attemptTokenRefresh, logout} from "../store/actions/actions";

export const CALL_API = 'Call API';

const API_ROOT = process.env.MIX_BASE_URL;

export const apiMiddleware = store =>
    next =>
        action => {
            const callAPI = action[CALL_API];
            if (typeof callAPI === "undefined") {
                return next(action);
            }

            let {endpoint, method, body, headers = {}} = callAPI;
            const {types} = callAPI;

            headers["Content-Type"] = "application/json";
            headers.Accept = "application/json";

            const token = store.getState().auth.accessToken;
            const refreshToken = store.getState().auth.refreshToken;
            if (typeof token === "string") {
                headers.Authorization = `Bearer ${token}`;
            }

            const actionWith = data => {
                const finalAction = Object.assign({}, action, data);
                delete finalAction[CALL_API];
                return finalAction;
            };

            const [requestType, successType, failureType] = types;
            next(actionWith({type: requestType}));

            if (body) {
                body = JSON.stringify(body);
            }

            return (
                fetch(`${API_ROOT}${endpoint}`, {
                    method,
                    body,
                    headers,
                    credentials: "same-origin"
                })
                // Reads the body stream into Flux Standard Action
                    .then(createFSAConverter(successType, failureType))
                    .then(
                        attemptRefresh({
                            action,
                            failure: logout,
                            next,
                            refreshActionCreator: () => attemptTokenRefresh(refreshToken),
                            store,
                            token
                        })
                    )
            );
        };