import React from 'react';
import DataTable from '../data/DataTable';
import Loading from "../utility/Loading";

export default class ViewScreen extends React.Component {

    componentWillMount() {
        this.setState(() => ({
            loading: true
        }));
    }

    componentDidMount() {
        const {fetch} = this.props;
        fetch().then((response) => {
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