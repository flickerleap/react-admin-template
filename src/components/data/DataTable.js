import React from 'react';
import {ActionColumn} from "./ActionColumn";
import {Pagination} from "./Pagination";
import {FilterBar} from "./FilterBar";
import {DisplayModel} from "../../data/DisplayModel";

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
            model: this.getModel(this.props)
        };
    }

    getModel = ({fields = [], items = [], pagination = {}}) => {
        return new DisplayModel({fields, items, pagination});
    };

    setModel(model) {
        this.setState(() => ({
            model
        }));
    }

    /**
     * Run this function when this component has been mounted
     */
    componentDidMount() {
        const model = this.getModel(this.props);
        this.setModel(model);
    }

    /**
     * Run this function when this component has been updated
     */
    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.fields !== prevProps.fields ||
            this.props.items !== prevProps.items ||
            this.props.pagination !== prevProps.pagination
        ) {
            this.setModel(this.getModel(this.props));
        }
    }

    /**
     *
     * @param {Object} item
     * @param {string} name
     * @returns {*}
     */
    getValue = (item, name) => {
        const field = this.state.model.get(name);
        if (field && field.valueFn) {
            return field.valueFn(item);
        } else {
            return this.state.model.getValue(item, name);
        }
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {title = '', actions = [], fields = [], onFilter} = this.props;
        const {model} = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    <span>{title}</span>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table-outline table table-hover">
                            <thead className="thead-light">
                            <tr>
                                {
                                    model.headers.map((name, index) => (
                                        name !== undefined && <th key={index}>{name}</th>
                                    ))
                                }
                                <th>Actions</th>
                            </tr>
                            <FilterBar fields={fields} onFilter={onFilter}/>
                            </thead>
                            <tbody>
                            {
                                model.items.map((item, index) => (
                                    <tr key={index}>
                                        {
                                            model.fields.map((field) => {
                                                return !field.hide &&
                                                    <td key={field.name}>{this.getValue(item, field.name)}</td>;
                                            })
                                        }
                                        <ActionColumn item={item} actions={actions}/>
                                    </tr>
                                ))
                            }
                            {
                                !model.hasItems() && <p>There are no records.</p>
                            }
                            </tbody>
                        </table>
                        <Pagination {...model.pagination}/>
                    </div>
                </div>
            </div>
        );
    }
}