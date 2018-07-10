/**
 * Class representing a Base Model object.
 */
export class BaseModel {
    /**
     * Creates an instance of this class
     *
     * @param {Array} fields - The list of fields that represent this model
     */
    constructor({fields = []} = {}) {
        this.fields = this.getFields(fields);
    }

    /**
     * The base function that returns the array of fields.
     * This function be overridden in sub classes.
     *
     * @param {Array} fields
     * @returns {Array}
     */
    getFields(fields = []) {
        return fields.map((field) => this.cloneField(field));
    }

    /**
     * Checks whether or not this field can be edited on the form.
     *
     * @param {Object} field
     * @returns {boolean}
     */
    isEditable = (field) => {
        return field.editable === undefined || field.editable !== false;
    };

    /**
     * Checks whether or not this field should be excluded from the form.
     *
     * @param {Object} field
     * @returns {boolean}
     */
    exclude = (field) => {
        return field.excludeFromForm !== undefined && field.excludeFromForm === true;
    };

    /**
     * Checks whether or not this field should be hidden on the data table.
     *
     * @param {Object} field
     * @returns {boolean}
     */
    hide = (field) => {
        return field.hide !== undefined && field.hide === true;
    };

    /**
     * Retrieves the label from a field object, or dynamically
     * generates it based on the name if the label field does not exist.
     *
     * @param {Object} field
     * @returns {string}
     */
    getLabel = (field) => {
        if (field.label === undefined) {
            const header = field.name.charAt(0).toUpperCase() + field.name.slice(1);
            return header.replace(/_/g, " ");
        }

        return field.label;
    };

    /**
     * Checks whether or not this field be shown based on
     * the item passed through to the `field.conditional(item)` function.
     *
     * @param {Object} field
     * @param {Object} item
     * @returns {boolean}
     */
    isConditional = (field, item) => {
        if (field.conditional !== undefined) {
            return field.conditional(item);
        } else {
            return false;
        }
    };

    /**
     * Sets a value in a field instance (found by the name given).
     *
     * @param {string} name
     * @param {any} value
     */
    set(name, value) {
        this.fields.map((field) => {
            if (field.name === name) {
                field.value = value;
            }

            return field;
        });
    }

    /**
     * Get a field object from the fields array.
     * @param name
     * @returns {Object}
     */
    get(name) {
        return this.fields.find((field) => field.name === name);
    }

    /**
     * Returns a default, single level object for use in a form.
     * This object is dynamically generated from the field configuration passed through.
     *
     * @returns {Object}
     */
    getDefaultObject() {
        let object = {};
        this.fields.forEach((field) => {
            if (this.isEditable(field)) {
                object[field.name] = field.defaultValue ? field.defaultValue : undefined;
            }
        });
        return object;
    }

    /**
     * Recursively retrieves a value from a data item.
     * It can get single level values like `data['name']`,
     * or multi-level values like `data[profile']['first_name']`.
     *
     * @param item
     * @param name
     * @returns {any}
     */
    getValue = (item, name) => {
        return name.split('.').reduce((o, i) => {
            return o[i];
        }, item);
    };

    /**
     * Clones a field object so references are not preserved
     * (this causes data problems across different views/forms)
     *
     * @param field
     * @returns {Object}
     */
    cloneField = (field) => {
        return Object.assign(field);
    };
}