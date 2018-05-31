import React from 'react';

export const DataView = ({item = {}, fields = []}) => (
    <div>
        {
            fields.map((field, index) => {
                const value = item[field.name] ? item[field.name] : '';
                return field.hide !== true && (
                    <p key={`field-${field.name}`}>{`${field.label}: ${value}`}</p>
                );
            })
        }
    </div>
);