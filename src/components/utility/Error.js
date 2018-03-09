import React from 'react';

const Error = (props) => (
    <div className="alert alert-danger" role="alert">
        {props.error}
    </div>
);

export default Error;