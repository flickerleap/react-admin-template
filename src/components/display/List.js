import React from 'react';
import Loading from '../utility/Loading';
import ListItem from './ListItem';

export default class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            titleField: this.props.titleField ? this.props.titleField : 'name'
        };
    }

    componentDidMount() {
        this.setState(() => ({
            loading:false
        }));
    }

    componentWillMount() {
        this.setState(() => ({
            loading:true
        }));
    }

    render() {
        return (
            <div>
                <Loading active={this.state.loading} />
                {
                    this.props.items.length === 0 ?
                        <p>No items.</p> :
                        this.props.items.map((item, index)=> {
                            const title = item[this.state.titleField];
                            return <ListItem key={index} title={title} content={this.props.getContent(item)} />;
                        })
                }
            </div>
        );
    }
}