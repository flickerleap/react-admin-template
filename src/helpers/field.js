const getValue = (data, fields = []) => {
    const field = fields.length > 0 ? fields[0] : undefined;
    const item = field && data[field] ? data[field] : undefined;

    if(item) {
        const newFields = [...fields.splice(0, 1)];
        return getValue(data, newFields);
    } else {
        return data;
    }
};