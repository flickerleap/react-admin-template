import React from 'react';
import {NavLink} from 'react-router-dom';

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
const Nav = ({className, links = []}) => (
    <ul className={className}>
        {
            links.map((link, index) => {
                const {items} = link;
                const hasItems = items !== undefined && items.length > 0;
                const dropdownProps = hasItems ? {
                    'data-toggle':"dropdown",
                    role:"button",
                    'aria-haspopup':true,
                    'aria-expanded':false
                } : {};
                return (
                    <li key={index} className={hasItems ? "nav-item dropdown" : "nav-items"}>
                        <NavLink className={hasItems ? "nav-link dropdown-toggle" : "nav-link"} to={hasItems ? "#" : link.path} {...dropdownProps}>{link.label}</NavLink>
                        {
                            hasItems && (
                                <div className="dropdown-menu">
                                    {
                                        items.map((item, index)=>(
                                            <NavLink key={index} className="dropdown-item" to={item.path}>{item.label}</NavLink>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </li>
                );
            })

        }
    </ul>
);

export default Nav;
