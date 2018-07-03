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
        return fieldName.split('.').reduce((o, i) => {
            return o[i];
        }, data);
    };

    static getData = (data) => {
        let processed = data;
        Object.keys(data).forEach((name) => {
            if (name.includes('.')) {
                let ref = processed;
                const fields = name.split('.').splice(1);
                fields.forEach((field, index) => {
                    ref[field] = index < fields.length -1 ? {} : data[name];
                    ref = ref[field];
                });
            }
        });

        return processed;
    };

    getBaseUrl() {
        const url = this.plural.toLowerCase().replace(/ /g, "-");
        return `/${url}`;
    }

    getActions(props) {
        return this.actions(props);
    }
}