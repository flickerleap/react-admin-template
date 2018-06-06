import React from 'react';
import {Link} from 'react-router-dom';
import {DeleteButton} from "./DeleteButton";

/**
 * Generate an action column for a Data Table
 *
 * @param {Object} item
 * @param {Object[]} actions
 * @returns {ActionColumn}
 */
export class ActionColumn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actions: this.getActions(this.props.actions)
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.actions = this.getActions(nextProps.actions);

        return state;
    }

    getActions(actions = []) {
        return actions.map((action, index) => {
            return this.getButton(action, index);
        });
    }

    getButton(action, index) {
        const {item} = this.props;
        switch (action.type) {
            case 'button':
                return <button className={action.classes} key={index} onClick={() => {
                    action.to(item)
                }}>{action.label}</button>;
            case 'delete':
                return <DeleteButton
                    key={index}
                    trigger={{
                        className: action.classes,
                        label: action.label
                    }}
                    action={() => action.to(item)}
                />;
            case 'link':
            default:
                return <Link className={action.classes} key={index} to={action.to(item)}>{action.label}</Link>;
        }
    }

    render() {
        return (
            <td className="action-column">
                <div className="action-container">
                    {
                        this.state.actions.map((action) => action)
                    }
                </div>
            </td>
        );
    }
}