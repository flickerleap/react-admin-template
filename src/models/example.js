import React from 'react';
import moment from "moment/moment";
import {Model} from "../data/Model";

export const model = new Model({
    type: 'Example',
    plural: 'Examples',
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter a name'
                }
            }
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter a description'
                }
            }
        },
        {
            name: 'number',
            label: 'Number',
            type: 'number',
            extra: {
                max: 10,
                min: 0
            },
            hide: true,
            defaultValue: 100,
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter a number'
                }
            }
        },
        {
            name: 'start_date',
            label: 'Start Date',
            defaultValue: moment(),
            type: 'date',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter a start date'
                }
            },
            filter: {
                type: 'date',
                defaultValue: moment().format('YYYY-MM-DD')
            },
        },
        {
            name: 'end_date',
            label: 'End Date',
            defaultValue: moment(),
            type: 'date',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter an end date'
                }
            },
            filter: {
                type: 'date',
                defaultValue: moment().format('YYYY-MM-DD')
            },
        },
        {
            name: 'start_time',
            label: 'Start Time',
            defaultValue: moment().format('HH:mm'),
            type: 'time',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter a start time'
                }
            },
            filter: {
                type: 'time',
                defaultValue: moment().format('HH:mm')
            },
        },
        {
            name: 'interests',
            label: 'Interests',
            type: 'checkboxlist',
            items: [
                {value: 'Pottery', label: 'Pottery'},
                {value: 'Knitting', label: 'Knitting'},
                {value: 'Running', label: 'Running'},
            ],
            filter: {
                type: 'dropdown'
            },
            value: ['Pottery', 'Running']
        }, {
            name: 'user.profile.mobile_number',
            label: 'Mobile Number',
            type: 'text',
        }
    ],
    links: [
        {
            url: '#',
            name: 'Examples',
            icon: 'fas fa-question',
            children: [
                {
                    url: '/',
                    name: 'View',
                    access: ['admin']
                },
                {
                    url: '/add',
                    name: 'Add',
                    access: ['admin']
                },
            ],
            access: ['admin']
        }
    ],
    actions: ({remove}) => {
        return [
            {
                type: 'link',
                label: <i className="fas fa-edit"></i>,
                classes: 'btn btn-primary',
                to: ({id}) => `/examples/${id}/edit`,
            },
            {
                type: 'link',
                label: 'View',
                classes: 'btn btn-success',
                to: ({id}) => `#`,
            },
            {
                type: 'delete',
                label: <i className="fa fa-trash-alt"></i>,
                classes: 'btn btn-danger',
                to: ({id}) => remove(id),
            }
        ];
    }
});

export const exampleItems = [
    {
        id: 1,
        name: 'Example',
        description: 'Example',
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        start_time: moment().format('LT'),
        interests: ['Pottery', 'Running'],
        user: {
            profile: {
                mobile_number: '0111234567'
            }
        }
    }
];