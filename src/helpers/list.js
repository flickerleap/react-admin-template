export const addEmptyItem = (items, label = 'Select') => {
    return [
        {
            label,
            value: null
        },
        ...items
    ];
};

export const getPagination = ({total = 1, current = 1, perPage = 1, link = ''}) => ({
    total,
    current,
    perPage,
    link
});