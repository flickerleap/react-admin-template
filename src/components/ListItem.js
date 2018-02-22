import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const ListItem = ({ id, title, itemType }) => (
    <div>
        <Card
            title={title}
            text={(
                <div>
                    <Link to={`/${itemType}/edit/${id}`}>
                        Edit
                    </Link>
                </div>
            )}
        />
        <br/>
    </div>
);

export default ListItem;