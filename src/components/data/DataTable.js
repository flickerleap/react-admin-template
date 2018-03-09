import React from 'react';
import ActionColumn from "./ActionColumn";

export default class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items !== undefined ? props.items : [],
            first: props.items.length > 0 ? props.items[0] : undefined,
            fields: props.fields !== undefined ? props.fields : [],
            filters: [],
            rows: [],
            headers: []
        };
    }

    componentDidMount() {
        this.setData();
        this.setHeaders();
    }

    setData() {
        this.setState(() => ({
            items: this.props.items !== undefined ? this.props.items : [],
            first: this.props.items.length > 0 ? this.props.items[0] : undefined,
        }));
    }

    setHeaders() {
        if (this.state.first) {
            this.setState(() => ({
                headers: Object.keys(this.state.first).map((name) => {
                    if(this.includeField(name)) {
                        return this.getHeaderName(name);
                    }
                })
            }));
        }
    }

    includeField(name) {
        const result = this.state.fields.find((field) => field.name === name);
        return result !== undefined;
    }


    getHeaderName = (header) => {
        const name = header.charAt(0).toUpperCase() + header.slice(1);
        return name.replace(/_/g, " ");
    };

    setFilters() {

    }

    getRows() {
        const {actions = []} = this.props;
        return this.state.items.map((item, index) => {
            return <tr key={index}>
                {Object.keys(item).map((name) => {
                    return this.includeField(name) && <td key={name}>{item[name]}</td>;
                })}
                <ActionColumn item={item} actions={actions} />
            </tr>;
        });
    }

    getHeaders() {
        return this.state.headers.map((name, index) => (
            name !== undefined && <th key={index}>{name}</th>
        ));
    }

    getFilters() {

    }

    render() {
        const {title = ''} = this.props;

        return (
            <div>
                <h4>{title}</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {this.getHeaders()}
                        <th>Actions</th>
                    </tr>
                    <tr>
                        {this.getFilters()}
                    </tr>
                    </thead>
                    <tbody>
                    {this.getRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}