import React from 'react';
import {Card} from './Card';

export const ListItem = ({title, content}) => (
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