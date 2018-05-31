import React from 'react';

/**
 *
 * @param active
 * @param loadingImage
 * @returns {*}
 * @constructor
 */
export const Loading = ({active = false}) => (
    active && (
        <div className="loading">
        </div>
    )
);