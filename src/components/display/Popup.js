import React from 'react';
import Popup from 'react-popup';

const popup = Popup.register({
    title: 'I am special',
    content: 'Since I am special you might need me again later. Save me!',
    buttons: {
        left: ['cancel'],
        right: [{
            text: 'Remove',
            className: 'success',
            action: function () {
                Popup.alert('You pressed the Save btn');

                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }]
    }
});

Popup.queue(popup);