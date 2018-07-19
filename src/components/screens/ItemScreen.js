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
            item: undefined,
            errors: []
        };
    }

    componentDidMount() {
        this.getItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getItem();
        }
    }

    getItem() {
        const {getItem} = this.props;
        getItem(this.props.match.params.id).then((action) => {
            this.setState((prevState) => ({
                loading: false,
                item: action.payload.data
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

    render() {
        const {title = 'View Item', fields = [], extraContent = ''} = this.props;
        const {item = {}} = this.state;
        return (
            <div className="row">
                <h1>{title}</h1>
                {this.state.loading && <Loading active={this.state.loading}/>}
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <Card
                                title='Lease'
                                text={(
                                    item && <DataView item={item} fields={fields}/>
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        {extraContent}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        leases: state.leases
    };
};

const mapDispatchToProps = (dispatch) => ({
    getLease: (params) => dispatch(getLease(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewLeaseScreen);
