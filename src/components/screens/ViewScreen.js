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
            currentPage: params.page,
            loading: true
        };
    }

    getParams = () => {
        return {
            ...this.state.params,
            page: this.state.currentPage
        };
    };

    componentDidMount() {
        this.fetchItems(this.getParams());
    }

    fetchItems = (filters = {}) => {
        const {fetch, params = {}} = this.props;
        params.filters = params.filters ? Object.assign(params.filters, filters) : filters;
        fetch(params).then((action) => {
            this.setState(() => ({
                loading: false
            }));
        });
    };

    getAddUrl = () => {
        const path = this.props.location.pathname;
        const lastChar = path.slice(-1);
        return lastChar === '/' ? `${path}add` : `${path}/add`;
    };

    onFilter = (filters) => {
        this.setState(() => ({
            loading: true
        }));
        this.fetchItems(filters);
    };

    render() {
        const {title = 'View', fields = [], items = [], actions = [], pagination = {}, showAddButton = true} = this.props;
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <h3>{title}</h3>
                </div>
                <div className='col-md-12'>
                    {
                        showAddButton && <AddButton link={this.getAddUrl()} type={title}/>
                    }
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
                                onFilter={this.onFilter}
                            />
                    }
                </div>
            </div>
        );
    }
}