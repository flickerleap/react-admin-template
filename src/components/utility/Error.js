import React from 'react';

/**
 *
 * @param errors
 * @returns {*}
 * @constructor
 */
export const Error = ({errors = {}}) => (
    <div className="alert alert-danger" role="alert">
        {
            Object.keys(errors).map((key, index)=>(
                <div key={index}>
                    <span>
                        {
                            typeof(errors[key]) === 'array' ?
                                errors[key][0] : errors[key]
                        }
                    </span>
                    <br/>
                </div>
            ))
        }
    </div>
);