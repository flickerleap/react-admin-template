import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const ListItem = ({ title, content }) => (
    <div>
        <Card
            title={title}
            text={(
                <div>
                    {content}
                </div>
            )}
        />
        <br/>
    </div>
);

export default ListItem;