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
        this.fields = this.cloneFields(fields);
    }

    /**
     * The base function that returns the array of fields.
     * This function be overridden in sub classes.
     *
     * @param {Array} fields
     * @returns {Array}
     */
    getFields(fields = []) {
        return this.cloneFields(fields);
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
     * @returns {boolean|undefined}
     */
    show = (field, item) => {
        if (field.canShow !== undefined) {
            return field.canShow(item);
        }

        return true;
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
        let index = 0;
        const fields = name.split('.');
        return fields.reduce((object, field) => {
            let value = undefined;
            if (index < fields.length - 1) {
                value = object[field] || {};
            } else {
                value = object[field];
            }
            index++;
            return value;
        }, item);
    };

    /**
     * Clones a fields array so references are not preserved
     * (this prevents data problems across different views/forms)
     *
     * @param {Array} fields
     * @returns {Array}
     *
     */
    cloneFields = (fields = []) => {
        return fields.map((field) => Object.assign(field));
    };

    /**
     * Checks if an existing field has a value or not.
     *
     * @param {Object} field
     */
    hasValue = (field) => {
        return field.value !== undefined && field.value !== '';
    };
}