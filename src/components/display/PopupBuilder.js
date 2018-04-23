import React from 'react';
import Popup from 'react-popup';

export class PopupBuilder {
    constructor(props) {
        this.props = props;

        const { title, content, buttons = this.getButtonsTemplate() } = props;
        this.popup = Popup.register({
            title,
            content,
            buttons
        });
    }

    getButtonsTemplate = () => {
        return {
            left: ['Cancel'],
            right: ['OK']
        };
    };

    getPopup(){
        return this.popup;
    }

    queue() {
        Popup.queue(this.popup);
    }
}