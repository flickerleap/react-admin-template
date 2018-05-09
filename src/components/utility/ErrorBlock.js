import React from 'react';

/**
 *
 * @param errors
 * @returns {*}
 * @constructor
 */
export const ErrorBlock = ({error, classes = 'alert alert-danger error'}) => (
    <div className={classes} role="alert">
        {error}
    </div>
);