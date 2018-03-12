import React from 'react';

/**
 *
 * @param active
 * @returns {*}
 * @constructor
 */
const Loading = ({active = false}) => (
    <div className="loading">
        {
            active && <p>Loading</p>
        }
    </div>
);

export default Loading;