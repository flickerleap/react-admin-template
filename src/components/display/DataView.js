import React from 'react';

export const DataView = ({item = {}, fields = []}) => (
    <div>
        {
            fields.map((field, index) => {
                let value = item[field.name] ? item[field.name] : '';

                if(field.valueFn !== undefined) {
                    value = field.valueFn(item);
                }

                return field.hide !== true && (
                    <p key={`field-${field.name}`}>{`${field.label}: `}{value}</p>
                );
            })
        }
    </div>
);