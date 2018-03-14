import React from 'react';
import Form from '../../components/form/Form';

export default class AddScreen extends React.Component {
    onSubmit = (item) => {
        const {redirectPath, add} = this.props;
        add(item).then((response) => {
            console.log(response);
            this.props.history.push(redirectPath);
        });
    };

    render() {
        const {title, fields} = this.props;
        return (
            <div>
                <h3>{title}</h3>
                <Form
                    fields={fields}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}