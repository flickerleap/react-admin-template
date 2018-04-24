export const getSelectors = (type, filters = {}, sort = [], fields = [], includes=[]) => {
    return `${getFilters(filters)}${getSort(sort)}${getFields(fields)}${getIncludes(includes)}`;
};

export const getFilters = (items = {}) => {
    const length = Object.keys(items).length;
    let string = length > 0 ? "&" : "";
    Object.keys(items).forEach((key, index) => {
        string += `filter[${key}]=${items[key]}`;
        string += index < length - 1 ? "&" : "";
    });

    return string;
};

export const getSort = (items = []) => {
    const length = items.length;
    let string = length > 0 ? "&sort=" : "";
    items.forEach((value, index) => {
        string += `${value}`;
        string += index < length - 1 ? "," : "";
    });

    return string;
};

export const getFields = (type, items = []) => {
    const length = items.length;
    let string = length > 0 ? `&fields[${type}]=` : "";
    items.forEach((value, index) => {
        string += `${value}`;
        string += index < length - 1 ? "," : "";
    });

    return string;
};

export const getIncludes = (items = []) => {
    const length = items.length;
    let string = length > 0 ? `&include=` : "";
    items.forEach((value, index) => {
        string += `${value}`;
        string += index < length - 1 ? "," : "";
    });

    return string;
};

export const updateParams = (items = [], params = []) => {
    const isArray = items instanceof Array;
    if(isArray) {
        return updateArrayParams(items, params);
    } else {
        return updateObjectParams(items, params);
    }
};

export const updateArrayParams = (items = [], params = []) => {
    params.forEach((param) => {
        items.push(param);
    });

    return items;
};

export const updateObjectParams = (obj = {}, params = []) => {
    params.forEach((param) => {
        obj[param.field] = param.value;
    });

    return obj;
};