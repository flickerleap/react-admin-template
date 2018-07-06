import React from 'react';
import {ActionColumn} from "./ActionColumn";
import {Pagination} from "./Pagination";
import {FilterBar} from "./FilterBar";
import {Model} from "../../data/Model";

/**
 * Component to display rows of data in a table
 *
 * @param {Object} props
 * @param {Array} props.items
 * @param {Array} props.fields
 * @param {Object} props.pagination
 * @returns {DataTable}
 * @constructor
 */
export class DataTable extends React.Component {
    /**
     *
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            items: props.items || [],
            fields: props.fields || [],
            pagination: props.pagination || {
                total: 1,
                current: 1,
                perPage: 1,
                link: ''
            },
            filters: [],
            rows: [],
            headers: []
        };
    }

    /**
     * Run this function when this component has been mounted
     */
    componentDidMount() {
        this.setState((prevState) => ({
            first: prevState.items.length > 0 ? prevState.items[0] : undefined,
            headers: prevState.fields.map((field) => {
                if (!this.hideField(field)) {
                    return this.getHeaderName(field);
                }
            })
        }));
    }

    /**
     *
     * @param {Object} nextProps
     * @param {Object} prevState
     * @returns {*}
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.items = nextProps.items ? nextProps.items : [];

        return state;
    }

    /**
     *
     * @param {Object} field
     * @returns {boolean}
     */
    hideField = (field) => {
        return field.hide !== undefined ? field.hide : false;
    };

    /**
     *
     * @param {string} name
     * @returns {T | undefined}
     */
    getField = (name) => {
        return this.state.fields.find((field) => field.name === name);
    };

    /**
     *
     * @param {Object} field
     * @returns {string}
     */
    getHeaderName = (field) => {
        if (field.label === undefined) {
            const header = field.name.charAt(0).toUpperCase() + field.name.slice(1);
            return header.replace(/_/g, " ");
        }

        return field.label;
    };

    /**
     *
     * @param {Object} item
     * @param {string} name
     * @returns {*}
     */
    getValue = (item, name) => {
        const field = this.getField(name);
        if (field.valueFn) {
            return field.valueFn(item);
        } else {
            return Model.getValue(item, name);
        }
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {title = '', actions = [], onFilter} = this.props;
        const {pagination, items, headers, fields} = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    <span>{title}</span>
                </div>
                <div className="card-body">
                    {
                        items.length > 0 ?
                            <div className="table-responsive">
                                <table className="table-outline table table-hover">
                                    <thead className="thead-light">
                                    <tr>
                                        {
                                            headers.map((name, index) => (
                                                name !== undefined && <th key={index}>{name}</th>
                                            ))
                                        }
                                        <th>Actions</th>
                                    </tr>
                                    <FilterBar fields={fields} onFilter={onFilter}/>
                                    </thead>
                                    <tbody>
                                    {
                                        items.map((item, index) => (
                                            <tr key={index}>
                                                {
                                                    this.state.fields.map((field) => {
                                                        return !this.hideField(field) &&
                                                            <td key={field.name}>{this.getValue(item, field.name)}</td>;
                                                    })
                                                }
                                                <ActionColumn item={item} actions={actions}/>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                                <Pagination {...pagination}/>
                            </div> :
                            <p>No records found.</p>
                    }
                </div>
            </div>
        );
    }
}