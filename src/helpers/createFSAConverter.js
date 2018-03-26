export const createFSAConverter = (successType, failureType) => {
    return (response) => {
        if (!response.ok) {
            return {
                error: true,
                payload: {
                    status: response.status,
                    response: response.json()
                },
                type: failureType
            };
        }

        const contentType = response.headers.get("Content-Type");
        const emptyCodes = [204, 205];

        const createSuccessType = (payload) => {
            return {
                payload: payload,
                type: successType
            };
        };

        if (emptyCodes.indexOf(response.status) === -1 && contentType && contentType.indexOf("json") !== -1) {
            return response.json().then(createSuccessType);
        } else {
            return createSuccessType();
        }
    };
};