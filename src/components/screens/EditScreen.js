import React from 'react';
import Form from '../../components/form/Form';
import Loading from '../utility/Loading';

export default class EditScreen extends React.Component {
    state = {
        loading: false,
        item: {}
    };

    onSubmit = (item) => {
        const {redirectPath, edit} = this.props;
        edit({id: this.state.item.id, ...item}).then((response) => {
            console.log(response);
            this.props.history.push(redirectPath);
        });
    };

    componentWillMount(){
        this.setState(() => ({
            loading:true
        }));
    }

    componentDidMount() {
        this.props.fetch().then(() => {
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
                        : <Form
                            newRecord={false}
                            fields={fields}
                            onSubmit={this.onSubmit}
                            data={this.state.item}
                        />
                }
            </div>
        );
    }
}