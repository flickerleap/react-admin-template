import React from 'react';
import {DynamicForm} from '../form/form';
import {Loading} from '../utility/Loading';
import {hasErrors} from "../../helpers/validate";

export class EditScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            item: {},
            errors: []
        };
    }

    resultHasErrors = (action) => {
        if (hasErrors(action)) {
            this.setState(() => ({
                loading: false,
                errors: action.payload.response.errors
            }));
            return true;
        }

        return false;
    };

    onSubmit = (item) => {
        const {redirectPath, edit} = this.props;
        const userID = this.props.user ? this.props.user.id : undefined;
        edit({id: this.state.item.id, ...item},userID).then((action) => {
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

    componentWillMount(){
        this.setState(() => ({
            loading:true
        }));
    }

    componentDidMount() {
        const userID = this.props.user ? this.props.user.id : undefined;
        this.props.fetch(undefined, userID).then(() => {
            this.setState(() => ({
                item: this.props.items.find((item) => parseInt(item.id) === parseInt(this.props.match.params.id)),
                loading: false,
            }));
        });
    }

    render() {
        const {title, fields} = this.props;
        return (
            <div>
                <h3>{title}</h3>
                {
                    this.state.loading ? <Loading active={this.state.loading}/>
                        : <DynamicForm
                            newRecord={false}
                            fields={fields}
                            errors={this.state.errors}
                            onSubmit={this.onSubmit}
                            data={this.state.item}
                        />
                }
            </div>
        );
    }
}