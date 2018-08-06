import React from 'react';
import {Card} from "../display/Card";
import {hasErrors} from "../../helpers/validate";
import {Loading} from "../utility/Loading";
import {DataView} from "../display/DataView";

export class ItemScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            errors: []
        };
    }

    componentDidMount() {
        this.getItems();
    }

    /*componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.getItems();
        }
    }*/

    getItems() {
        const {getItems} = this.props;
        getItems(this.props.match.params.id).then(() => {
            this.setState(() => ({
                loading: false
            }));
        });
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

    getColumnClass() {
        const {columns = 2} = this.props;

        return `col-md-${12 / columns}`;
    }

    getView(item) {
        const {fields = [], customView = undefined} = this.props;
        const props = {fields, item};
        if(customView === undefined) {
            return React.createElement(DataView, props)
        }

        return React.createElement(customView, props)
    }

    render() {
        const {title = 'View Items', type = 'Item', extraContent = '', items = []} = this.props;
        const {loading} = this.state;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h1>{title}</h1>
                    </div>
                </div>
                {loading && <Loading active={loading}/>}
                <div className="row">
                    {
                        items.map((item, index) => (
                            <div key={index} className={this.getColumnClass()}>
                                <Card
                                    title={`${type} ${index+1}`}
                                    text={(
                                        item && this.getView(item)
                                    )}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {extraContent}
                    </div>
                </div>
            </div>
        );
    }
}
