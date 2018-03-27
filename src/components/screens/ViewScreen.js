import React from 'react';
import {DataTable} from '../data/DataTable';
import {Loading} from "../utility/Loading";
import {AddButton} from "../data/AddButton";
import qs from 'query-string';

/**
 * Component to display data screen for model
 *
 * @param props
 * @returns {ViewScreen}
 * @constructor
 */
export class ViewScreen extends React.Component {

    constructor(props) {
        super(props);

        const params = qs.parse(this.props.history.location.search);

        this.state = {
            params,
            currentPage: params.page
        };

        console.log(this.state.params);
    }

    componentWillMount() {
        this.setState(() => ({
            loading: true
        }));
    }

    componentDidMount() {
        const {fetch} = this.props;
        fetch({page:this.state.currentPage}).then((response) => {
            this.setState(() => ({
                loading: false
            }));
        });
    }

    render() {
        const {title = 'View', fields = [], items = [], actions = [], pagination={}} = this.props;
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <h3>{title}</h3>
                </div>
                <div className='col-md-12'>
                    <AddButton link={""} type={title} />
                    <br/>
                </div>

                <div className='col-md-12'>
                    {
                        this.state.loading ? <Loading active={this.state.loading}/>
                            :
                            <DataTable
                                title={title}
                                fields={fields}
                                items={items}
                                actions={actions}
                                pagination={pagination}
                            />
                    }
                </div>
            </div>
        );
    }
}