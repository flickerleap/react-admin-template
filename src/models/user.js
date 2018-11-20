import React from 'react';
import moment from "moment/moment";
import {Model} from "../data/Model";

export const model = new Model({
    type: 'User',
    plural: 'Users',
    fields: [
        {
            name: 'profile.first_name',
            label: 'First Name',
            type: 'text',
        }, {
            name: 'profile.last_name',
            label: 'Last Name',
            type: 'text',
        }, {
            name: 'email',
            label: 'Email',
            type: 'email',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter an email address'
                }
            }
        }, {
            name: 'profile.mobile_number',
            label: 'Mobile Number',
            type: 'text',
        }, {
            name: 'birth_date',
            label: 'Date Of Birth',
            defaultValue: moment().format('YYYY-MM-DD'),
            type: 'date',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter a date of birth'
                }
            },
            filter: {
                type: 'date',
                defaultValue: moment().format('YYYY-MM-DD')
            },
        }, {
            name: 'image.src',
            label: 'Profile Image',
            type: 'text',
        }, {
            name: 'subscriptions',
            label: 'Subscriptions',
            type: 'checkboxlist',
            items: [
              {value: 'Newsletter', label: 'Newsletter'},
              {value: 'Email', label: 'Email'}
            ],
            value: ['Newsletter']
        }
    ],
    links: [
        {
            url: '#',
            name: 'Users',
            icon: 'fas fa-user',
            ability: '*',
            children: [
                {
                    url: '/',
                    name: 'View',
                    ability: '*'
                },
                {
                    url: '/add',
                    name: 'Add',
                    ability: '*'
                },
            ],
        }
    ],
    actions: ({remove}) => {
        return [
            {
                type: 'link',
                label: <i className="fas fa-edit"></i>,
                classes: 'btn btn-primary',
                to: ({id}) => `/users/${id}/edit`,
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

export const userItems = [
    {
        id: 1,
        email: 'test@example.com',
        birth_date: moment().format('YYYY-MM-DD'),
        profile: {
            first_name: 'First Name',
            last_name: 'Last Name',
            mobile_number: '0111234567'
        },
        image: {
            src: '#'
        }
    }
];
