export const getUserFromStore = (store) => {
    if(store !== undefined) {
        return store.getState().auth.user;
    }
};

export const getUserFromState = (state) => {
    return state.auth.user && state.auth.user.data ? state.auth.user.data : state.auth.user ? state.auth.user : {};
};