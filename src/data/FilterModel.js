import {BaseModel} from "./BaseModel";
import {getPagination} from "../helpers/list";

/**
 * Class representing a FilterModel.
 * @extends BaseModel
 */
export class FilterModel extends BaseModel {
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
     * Any fields that are hidden are not included in the returned array.
     * @param {Array} fields
     * @returns {Array}
     */
    getFields = (fields = []) => {
        return this.cloneFields(fields).reduce((result, field) => {
            if (!this.hide(field)) {
                field.filter = field.filter || {};
                field.filter.enabled = this.canFilter(field);
                field.error = undefined;
                field.value = field.filter.defaultValue
                    ? field.filter.defaultValue : field.defaultValue
                        ? field.defaultValue : '';

                result.push(field);
            }
            return result;
        }, []);
    };

    /**
     * Checks whether or not a specific field can be filtered.
     * @param {Object} field
     * @returns {*}
     */
    canFilter = (field) => {
        if (field.filter && field.filter.enabled !== undefined) {
            return field.filter.enabled;
        }

        return true;
    };
}