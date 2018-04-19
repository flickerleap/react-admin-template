import React from 'react';
import {DynamicForm} from '../form/form';
import {contains} from "../../helpers/string";

export class AddScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };
    }

    onSubmit = (item) => {
        const {redirectPath, add} = this.props;
        add(item).then((action) => {
            const data = action.payload.response;
            if (contains(action.type, 'FAILURE')) {
                this.setState(() => ({
                    errors: action.errors,
                    errorMessage: data.message
                }));
            } else {
                this.props.history.push(redirectPath);
            }
        });
    };

    render() {
        const {title, fields} = this.props;
        return (
            <div>
                <h3>{title}</h3>
                <DynamicForm
                    errors={this.state.errors}
                    fields={fields}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}