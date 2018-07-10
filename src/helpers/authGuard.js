import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

export const userNeedsAuthentication = connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/login',
    // Determine if the user is authenticated or not
    authenticatedSelector: state => !!state.auth.accessToken,

    authenticatingSelector: state => state.auth.loading,
    // A nice display name for this check
    wrapperDisplayName: 'UserNeedsAuthentication'
});

const locationHelper = locationHelperBuilder({});

export const userDoesNotNeedAuthentication = connectedRouterRedirect({
    // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    // This prevents us from adding the query parameter when we send the user away from the login page
    allowRedirectBack: false,
    // This prevents us from adding the query parameter when we send the user away from the login page
    // Determine if the user is authenticated or not
    authenticatedSelector: state => !state.auth.accessToken,
    // A nice display name for this check
    wrapperDisplayName: 'UserDoesNotNeedAuthentication'
});