export const getEventObject = (name, value) => {
    return {
        target: {
            name: name,
            value: value
        }
    };
};