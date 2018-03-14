import React from 'react';
import {Link} from 'react-router-dom';

const ActionColumn = ({item, actions=[]}) => (
    <td>
        {
            actions.map((action, index)=>(
                <Link key={index} to={action.to(item)}>{action.label}</Link>
            ))
        }
    </td>
);

export default ActionColumn;