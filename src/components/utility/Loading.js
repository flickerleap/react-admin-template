import React from 'react';

const Loading = ({active = false}) => (
    <div className="loading">
        {
            active && <p>Loading</p>
        }
    </div>
);

export default Loading;