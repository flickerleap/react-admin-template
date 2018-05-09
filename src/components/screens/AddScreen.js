import React from 'react';
import {DynamicForm} from '../form/form';
import {hasErrors} from "../../helpers/validate";

export class AddScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };
    }

    resultHasErrors = (action) => {
        if (hasErrors(action)) {
            this.setState(() => ({
                loading: false,
                errors: action.payload.response
            }));
            return true;
        }

        return false;
    };

    onSubmit = (item) => {
        const {redirectPath, add} = this.props;
        add(item).then((action) => {
            if (!this.resultHasErrors(action)) {
                this.props.history.push(redirectPath);
            }
        }).catch((error) => {
            this.setState(() => ({
                loading: false,
                errors: error.payload.response
            }));
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