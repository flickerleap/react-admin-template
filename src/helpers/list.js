export const addEmptyItem = (items, label = 'Select') => {
    return [
        {
            label,
            value: null
        },
        ...items
    ];
};