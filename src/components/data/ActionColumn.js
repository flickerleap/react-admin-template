import React from 'react';
import {Link} from 'react-router-dom';

export const ActionColumn = ({item, actions=[]}) => (
    <td>
        {
            actions.map((action, index)=>(
                <Link key={index} to={action.to(item)}>{action.label}</Link>
            ))
        }
    </td>
);