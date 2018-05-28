
export const contains = (haystack, needle) => {
    return haystack.indexOf(needle) > -1;
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};