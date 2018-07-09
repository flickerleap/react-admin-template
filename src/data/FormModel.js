import {validateFields} from "../helpers/validate";

export class FormModel {
    constructor({fields = []} = {}) {
        this.fields = this.getFields(fields);
    }

    load(data = undefined) {
        if (data) {
            this.fields.map((field) => {
                if (field.form && field.form.valueFn) {
                    field.value = field.form.valueFn(data);
                } else {
                    field.value = this.getValue(data, field.name);
                }
            });
        }
    }

    set(name, value) {
        this.fields.map((field) => {
            if (field.name === name) {
                field.value = value;
            }

            return field;
        });
    }

    get(name) {
        return this.fields.find((field) => field.name === name);
    }

    setErrors(errors = undefined) {
        if (errors) {
            this.fields.map((field) => {
                if (errors[field.name]) {
                    field.error = errors[field.name][0];
                } else {
                    console.log(field.name);
                    field.error = undefined;
                }

                return field;
            });
        }
    }

    validate() {
        const errors = validateFields(this.fields);
        this.setErrors(errors);
    }

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

    isEditable = (field) => {
        return field.editable === undefined || field.editable !== false;
    };

    exclude = (field) => {
        return field.excludeFromForm !== undefined && field.excludeFromForm === true;
    };

    isConditional = (field, data) => {
        if (field.conditional !== undefined) {
            return field.conditional(data);
        }
    };

    getValue = (data, name) => {
        return name.split('.').reduce((o, i) => {
            return o[i];
        }, data);
    };

    hasErrors() {
        let errorCount = 0;
        this.fields.forEach((field) => {
            if (field.error !== undefined) {
                errorCount++;
            }
        });

        return errorCount > 0;
    }

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

    getReturnObject() {
        let data = {};
        this.fields.forEach((field) => {
            data[field.name] = field.value;
        });

        return this.processData(data);
    }
}