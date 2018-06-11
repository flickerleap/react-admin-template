export const createFSAConverter = (successType, failureType, meta = {}) => {
    return (response) => {
        if (!response.ok) {
            return response.json().then((payload) => ({
                error: true,
                payload: {
                    status: response.status,
                    response: payload
                },
                type: failureType,
                meta: meta
            }));
        }

        const contentType = response.headers.get("Content-Type");
        const emptyCodes = [204, 205];

        const createSuccessType = (payload) => {
            return {
                payload: payload,
                type: successType,
                meta: meta
            };
        };

        if (emptyCodes.indexOf(response.status) === -1 && contentType && contentType.indexOf("json") !== -1) {
            return response.json().then(createSuccessType);
        } else {
            return createSuccessType();
        }
    };
};