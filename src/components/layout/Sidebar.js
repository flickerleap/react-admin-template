import React from 'react';
import {Nav} from 'reactstrap';
import {Menu} from "./Menu";

/**
 * Generate a side navigation view with the given links.
 *
 * @param {string} className
 * @param {Object[]} links
 * @param {string} links[].path URL to set as the NavLink's "to" prop
 * @param {string} links[].label Name of the link
 * @returns {*}
 * @constructor
 */
export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    hideMobile = () => {
        if (document.body.classList.contains('sidebar-mobile-show')) {
            document.body.classList.toggle('sidebar-mobile-show')
        }
    };

    render() {
        const {links = []} = this.props;
        return (
            <div className="sidebar">
                <Nav>
                    <Menu items={links}/>
                </Nav>
            </div>
        );
    }
}