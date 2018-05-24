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
            name: 'start_date',
            label: 'Start Date',
            defaultValue: moment(),
            type: 'date',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter a start date'
                }
            }
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
            }
        },
        {
            name: 'start_time',
            label: 'Start Time',
            defaultValue: moment(),
            type: 'time',
            validation: {
                presence: {
                    allowEmpty: false,
                    message: '^Please enter a start time'
                }
            }
        },
        {
            name: 'interests',
            label: 'Interests',
            type: 'checkboxlist',
            filterType: 'dropdown',
            items: [
                {value:'Pottery', label:'Pottery'},
                {value:'Knitting', label:'Knitting'},
                {value:'Running', label:'Running'},
            ],
            value:['Pottery', 'Running']
        }
    ],
    links: [
        {
            url: '#',
            name: 'Examples',
            icon: 'fas fa-calendar-alt',
            children: [
                {
                    url: '/',
                    name: 'View'
                },
                {
                    url: '/add',
                    name: 'Add'
                },
            ]
        }
    ],
    actions: ({remove}) => {
        return [

        ];
    }
});