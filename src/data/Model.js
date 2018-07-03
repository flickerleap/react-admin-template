export class Model {
    constructor({type = '', plural = '', fields = [], links = [], actions = [], baseUrl = undefined}) {
        this.type = type;
        this.plural = plural;
        this.fields = fields;
        this.links = links;
        this.actions = actions;
        this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl();
    }

    getLinks() {
        return this.links.map((link) => ({
            url: `${this.baseUrl}/${link.url}`,
            name: link.name ? link.name : this.plural,
            icon: link.icon,
            access: link.access,
            children: link.children !== undefined ? link.children.map((item) => ({
                url: `${this.baseUrl}${item.url}`,
                name: item.name,
                icon: item.icon,
                access: link.access
            })) : []
        }));
    }

    getDefaultObject() {
        let object = {};
        this.fields.forEach((field) => {
            if (Model.isEditable(field)) {
                object[field.name] = field.defaultValue ? field.defaultValue : undefined;
            }
        });
        return object;
    }

    getFormFields() {
        return this.fields.reduce((result, field) => {
            if (!Model.exclude(field) && Model.isEditable(field)) {
                field.value = field.defaultValue ? field.defaultValue : '';
                result.push(field);
            }
            return result;
        }, []);
    }

    getDisplayFields() {
        return this.fields.reduce((result, field) => {
            if (!field.hide) {
                result.push(field);
            }
            return result;
        }, []);
    }

    static isEditable(field) {
        return field.editable === undefined || field.editable !== false;
    }

    static exclude(field) {
        return field.excludeFromForm !== undefined && field.excludeFromForm === true;
    }

    static getValue = (data, fieldName) => {
        const fields = fieldName.split('.');
        return Model.getValueRecursive(data, fields);
    };

    static getValueRecursive = (data, fields = []) => {
        const field = fields.length > 0 ? fields[0] : undefined;
        const item = field && data[field] ? data[field] : undefined;

        if(item && typeof(item) === 'object' && !Array.isArray(item)) {
            const newFields = [...fields.splice(1)];
            return Model.getValueRecursive(item, newFields);
        } else {
            return item;
        }
    };

    static getData = (data) => {
        const processed = {};
        Object.keys(data).forEach((name) => {
            const fields = name.split('.');
            processed[name] = Model.getDataRecursive(data, fields);
        });

        return processed;
    };

    static getDataRecursive = (data, fields = []) => {
        const object = {};
        if(fields.length > 1) {
            const newFields = [...fields.splice(1)];
            object[fields[0]] = {};
            return Model.getValueRecursive(object, newFields);
        } else {
            const field = fields[0];
            object[field] = data[field];

            return object;
        }
    };

    getBaseUrl() {
        const url = this.plural.toLowerCase().replace(/ /g, "-");
        return `/${url}`;
    }

    getActions(props) {
        return this.actions(props);
    }
}