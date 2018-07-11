import React from 'react';
import {DynamicForm} from '../form/form';
import {hasErrors} from "../../helpers/validate";
import {Model} from "../../data/Model";
import {Loading} from "../utility/Loading";

export class AddScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            loading: false
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
        add(item).then((action) => {
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
        const {title, fields = []} = this.props;
        return (
            <div>
                <h3>{title}</h3>
                {
                    this.state.loading && <Loading active={this.state.loading}/>
                }
                <DynamicForm
                    errors={this.state.errors}
                    fields={fields}
                    submitLabel={title}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}