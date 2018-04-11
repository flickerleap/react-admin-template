import React from 'react';
import {DynamicForm} from '../form/form';

export class AddScreen extends React.Component {
    onSubmit = (item) => {
        const {redirectPath, add} = this.props;
        add(item).then((response) => {
            this.props.history.push(redirectPath);
        });
    };

    render() {
        const {title, fields} = this.props;
        return (
            <div>
                <h3>{title}</h3>
                <DynamicForm
                    fields={fields}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}