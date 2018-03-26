import React from 'react';

/**
 *
 * @param active
 * @returns {*}
 * @constructor
 */
export const Loading = ({active = false}) => (
    <div className="loading">
        {
            active && <p>Loading</p>
        }
    </div>
);