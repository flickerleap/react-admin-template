import React from 'react';

export const DataView = ({item = {}, fields = []}) => (
    <div>
        {
            fields.map((field, index) => {
                let value = item[field.name] ? item[field.name] : '';

                if(field.valueFn !== undefined) {
                    value = field.valueFn(item);
                }

                const label = field.label ? `${field.label}: ` : '';

                return field.hide !== true && (
                    <p key={`field-${field.name}`}>{label}{value}</p>
                );
            })
        }
    </div>
);