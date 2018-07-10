import {BaseModel} from "./BaseModel";
import {getPagination} from "../helpers/list";

/**
 * Class representing a DisplayModel.
 * @extends BaseModel
 */
export class DisplayModel extends BaseModel {
    /**
     * Creates an instance of this class
     *
     * @param {Array} fields - The list of fields that represent this model
     * @param {Array} items - The items to be displayed in a data table
     * @param {{}} pagination - An object containing the pagination details for this data set
     */
    constructor({fields = [], items = [], pagination = {}} = {}) {
        super({fields});
        this.fields = fields;
        this.fields = this.getFields(this.fields);
        this.items = items;
        this.pagination = getPagination(pagination);
        this.headers = this.fields.map((field) => this.getLabel(field));
    }

    /**
     * The function that processes and returns the required array of fields.
     * Any fields that are hidden are not included in the returned array.
     * @param {Array} fields
     * @returns {Array}
     */
    getFields = (fields = []) => {
        return fields.reduce((result, field) => {
            if (!this.hide(field)) {
                result.push(field);
            }
            return result;
        }, []);
    };

    /**
     * Checks if this model has items or not.
     *
     * @returns {boolean}
     */
    hasItems = () => this.items.length > 0;
}