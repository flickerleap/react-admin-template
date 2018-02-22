import React from 'react';
import Loading from './Loading';
import ListItem from './ListItem';

export default class List extends React.Component {
    state = {
        loading: false
    };

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
                            const data = {
                                itemType: this.props.itemType,
                                ...item
                            };
                            return <ListItem key={index} {...data} />;
                        })
                }
            </div>
        );
    }
}