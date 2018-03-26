export const getUserFromStore = (store) => {
    if(store !== undefined) {
        return store.getState().auth.user;
    }
};