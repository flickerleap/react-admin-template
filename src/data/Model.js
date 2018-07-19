export class Model {
    constructor({type = '', plural = '', fields = [], links = [], actions = [], baseUrl = undefined, linkAbilityMapping = undefined}) {
        this.type = type;
        this.plural = plural;
        this.fields = fields;
        this.links = links;
        this.actions = actions;
        this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl();
        this.linkAbilityMapping = linkAbilityMapping || this.getDefaultLinkAbilityMapping();
    }

    getLinks() {
        return this.links.map((link) => ({
            url: `${this.baseUrl}/${link.url}`,
            name: link.name ? link.name : this.plural,
            icon: link.icon,
            action: this.getLinkAbility(link.name),
            type: this.type,
            children: link.children !== undefined ? link.children.map((item) => ({
                url: `${this.baseUrl}${item.url}`,
                name: item.name,
                icon: item.icon,
                action: this.getLinkAbility(link.name),
                type: this.type
            })) : []
        }));
    }

    getDefaultObject() {
        let object = {};
        this.fields.forEach((field) => {
            if (this.isEditable(field)) {
                object[field.name] = field.defaultValue ? field.defaultValue : undefined;
            }
        });
        return object;
    }

    getFormFields() {
        return this.fields;
    }

    getDisplayFields() {
        return this.fields.reduce((result, field) => {
            if (!field.hide) {
                result.push(field);
            }
            return result;
        }, []);
    }

    getLinkAbility(name) {
        const mapping = this.linkAbilityMapping.find((item) => name.includes(item.name));
        return mapping ? mapping.ability : '*';
    }

    getDefaultLinkAbilityMapping = () => {
        return [
            {
                name: 'View All',
                ability: 'index'
            },
            {
                name: 'View',
                ability: 'index'
            },
            {
                name: 'Add',
                ability: 'store'
            },
            {
                name: this.plural,
                ability: 'index'
            }
        ];
    };

    isEditable = (field) => {
        return field.editable === undefined || field.editable !== false;
    };

    getBaseUrl() {
        const url = this.plural.toLowerCase().replace(/ /g, "-");
        return `/${url}`;
    }

    getActions(props) {
        return this.actions(props);
    }
}