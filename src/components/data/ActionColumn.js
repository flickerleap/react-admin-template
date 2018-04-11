import React from 'react';
import {Link} from 'react-router-dom';

export const ActionColumn = ({item, actions=[]}) => (
    <td className="action-column">
        <div className="action-container">
        {
            actions.map((action, index)=>(
                <Link className={action.classes} key={index} to={action.to(item)}>{action.label}</Link>
            ))
        }
        </div>
    </td>
);