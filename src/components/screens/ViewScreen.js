import React from 'react';
import Grid from '../../components/grid/Grid';
import Loading from "../../components/utility/Loading";

export default class MeetingTypeScreen extends React.Component {

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
        const {title = 'View', fields = [], items = [], actions = []} = this.props;
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
                            <Grid
                                title={title}
                                fields={fields}
                                items={items}
                                actions={actions}
                            />
                    }
                </div>
            </div>
        );
    }
}