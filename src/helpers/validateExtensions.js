import {validate} from 'validate.js';
import moment from 'moment';

validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
        return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
        let format = "YYYY-MM-DD hh:mm:ss";

        if(options.dateOnly) {
            format = "YYYY-MM-DD";
        }

        if(options.timeOnly) {
            format = "HH:mm";
        }

        return moment.utc(value).format(format);
    }
});