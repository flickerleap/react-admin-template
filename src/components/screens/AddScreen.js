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
                errors: action.payload.response.errors
            }));

            return true;
        }

        return false;
    };

    onSubmit = (item) => {
        this.setState(() => ({
            loading: true
        }));
        const {redirectPath, add} = this.props;
        const userID = this.props.user ? this.props.user.id : undefined;
        add(item, userID).then((action) => {
            this.setState(() => ({
                loading: false
            }));
            if (!this.resultHasErrors(action)) {
                this.props.history.push(redirectPath);
            }
        }).catch((error) => {
            this.setState(() => ({
                loading: false,
                errors: error.payload.response.errors
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