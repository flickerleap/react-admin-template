/**
 * Adds an empty item to an array for a drop down list.
 *
 * @param {Array} items
 * @param {string} label
 * @param {any} defaultValue
 * @returns {*[]}
 */
export const addEmptyItem = (items, label = 'Select', defaultValue = undefined) => {
    return [
        {
            label,
            value: defaultValue
        },
        ...items
    ];
};

/**
 * Processes the pagination details and sets defaults if the fields are not provided.
 *
 * @param {number} total
 * @param {number} current
 * @param {number} perPage
 * @param {string} link
 * @returns {{total: number, current: number, perPage: number, link: string}}
 */
export const getPagination = ({total = 1, current = 1, perPage = 1, link = ''} = {}) => ({
    total,
    current,
    perPage,
    link
});