import {validateFields} from "../helpers/validate";
import {BaseModel} from "./BaseModel";

/**
 * Class representing a FormModel.
 * @extends BaseModel
 */
export class FormModel extends BaseModel {
    /**
     * Creates an instance of this class
     *
     * @param {Array} fields - The list of fields that represent this model
     */
    constructor({fields = []} = {}) {
        super({fields});
        this.fields = this.getFields(this.fields);
    }

    /**
     * The function that processes and returns the required array of fields.
     * Any fields that are excluded or aren't editable are not included in the returned array.
     * @param {Array} fields
     * @returns {Array}
     */
    getFields(fields = []) {
        return fields.reduce((result, field) => {
            if (!this.exclude(field) && this.isEditable(field)) {
                field.show = true;
                field.value = field.defaultValue || '';
                result.push(field);
            }

            return result;
        }, []);
    }

    /**
     * Loads the given object of data into the fields.
     *
     * @param {Object} data
     */
    load(data = undefined) {
        if (data) {
            this.fields.map((field) => {
                if (field.form && field.form.valueFn) {
                    field.value = field.form.valueFn(data);
                } else {
                    field.value = this.getValue(data, field.name);
                }

                if(field.value === undefined) {
                    field.value = field.defaultValue ? field.defaultValue : '';
                }
            });
        }
    }

    /**
     * Validates all fields in the form and sets any errors that are returned.
     */
    validate() {
        const errors = validateFields(this.fields);
        this.setErrors(errors);
    }

    /**
     * Sets the errors contained in the errors object parameter.
     *
     * @param {Object} errors
     */
    setErrors(errors = undefined) {
        if (errors) {
            this.fields.map((field) => {
                if (errors[field.name]) {
                    field.error = errors[field.name][0];
                } else {
                    field.error = undefined;
                }

                return field;
            });
        } else {
            this.clearErrors();
        }
    }

    /**
     * Clears all errors in the fields
     */
    clearErrors() {
        this.fields.map((field) => {
            field.error = undefined;

            return field;
        });
    }

    /**
     * Checks if this model contains any errors
     *
     * @returns {boolean}
     */
    hasErrors() {
        let errorCount = 0;
        this.fields.forEach((field) => {
            if (field.error !== undefined) {
                errorCount++;
            }
        });

        return errorCount > 0;
    }

    /**
     * Takes in a flat data object and generates a multi-level object.
     * This functions turns a field like `{profile.first_name: 'Name'}` into
     * ```
     * {
     *   profile: {
     *     first_name: 'Name'
     *   }
     * }
     * ```
     *
     * @param {Object} data
     * @returns {Object}
     */
    processData = (data) => {
        let processed = data;
        Object.keys(data).forEach((name) => {
            if (name.includes('.')) {
                let ref = processed;
                const fields = name.split('.');
                fields.forEach((field, index) => {
                    let value = undefined;
                    if (index < fields.length - 1) {
                        value = ref[field] || {};
                    } else {
                        value = data[name];
                    }
                    ref[field] = value;
                    ref = ref[field];
                });

                delete processed[name];
            }
        });

        return processed;
    };

    /**
     * Sets, processes and returns the final data object for submission
     * (set from the values contained within the field objects).
     *
     * @returns {Object}
     */
    getReturnObject() {
        let data = {};
        this.fields.forEach((field) => {
            data[field.name] = field.value;
        });

        return this.processData(data);
    }
}