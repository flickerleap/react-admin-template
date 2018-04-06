import React from 'react';
import {Link} from 'react-router-dom';

export const AddButton = ({className='btn btn-success', link, type}) => (
    <div>
        <Link className={className} to={link}>Add {type}</Link>
    </div>
);