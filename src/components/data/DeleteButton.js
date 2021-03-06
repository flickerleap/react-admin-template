import React from 'react';

export class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        const {action} = this.props;
        if (window.confirm(`Are you sure you wish to delete this item?`)) {
            action();
        }
    };

    render() {
        const {trigger} = this.props;

        return (
            <button onClick={this.onClick} className={trigger.className}>{trigger.label}</button>
        );
    }
}