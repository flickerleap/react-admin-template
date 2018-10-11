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
            actions: ActionColumn.getActions(this.props.item, this.props.actions)
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.actions = ActionColumn.getActions(nextProps.item, nextProps.actions);

        return state;
    }

    static getActions(item, actions = []) {
        return actions.map((action, index) => {
            return ActionColumn.getButton({action, index, item});
        });
    }

    static getButton({action, index, item}) {
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
            case 'external':
                return <a className={action.classes} key={index} href={action.to(item)}>{action.label}</a>;
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
