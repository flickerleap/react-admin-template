import React from 'react';

export const headerMenuItems = [
    {
        name: 'Home',
        url: '/',
        icon: 'fas fa-home',
        ability: '*'
    },
    {
        name: <i className="fas fa-user"></i>,
        url: '#',
        children: [
            {
                name: 'Edit profile',
                url: '/profile/:id',
                icon: 'fas fa-user-edit',
                toBind: [
                    {
                        key: ':id',
                        valueFn: ({user}) => {
                            return user.id;
                        }
                    }
                ],
                ability: '*'
            },
            {
                name: 'Logout',
                url: '/logout',
                icon: 'fas fa-sign-out-alt',
                ability: '*'
            },
        ]
    }
];