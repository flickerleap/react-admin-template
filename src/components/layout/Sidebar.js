import React from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';

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

    handleClick = (e) => {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    };

    activeRoute = (routeName, props) => {
        // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

    };

    hideMobile = () => {
        if (document.body.classList.contains('sidebar-mobile-show')) {
            document.body.classList.toggle('sidebar-mobile-show')
        }
    };

    hasItems = (items) => {
        return items !== undefined && items.length > 0;
    };

    getNavType = (item, idx) => {
        return item.title ? this.getTitle(item, idx) :
            item.divider ? this.getDivider(item, idx) :
                item.label ? this.getNavLabel(item, idx) :
                    item.children ? this.getNavDropdown(item, idx)
                        : this.getNavItem(item, idx);
    };

    getTitle = (title, key) => {
        const classes = classNames('nav-title', title.class);
    };

    getDivider = (divider, key) => {
        const classes = classNames('divider', divider.class);
        return (<li key={key} className={classes}>

        </li>);
    };

    getNavLabel = (item, key) => {
        const classes = {
            item: classNames('hidden-cn', item.class),
            link: classNames('nav-label', item.class ? item.class : ''),
            icon: classNames(
                !item.icon ? 'fas fa-circle' : item.icon,
                item.label.variant ? `text-${item.label.variant}` : '',
                item.label.class ? item.label.class : ''
            )
        };
        return (
            this.getNavLink(item, key, classes)
        );
    };

    getNavLink = (item, key, classes) => {
        const url = item.url ? item.url : '';
        return (
            <NavItem key={key} className={classes.item}>
                {this.isExternal(url) ?
                    <RsNavLink href={url} className={classes.link} active>
                        <i className={classes.icon}></i> {item.name} {this.getBadge(item.badge)}
                    </RsNavLink>
                    :
                    <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
                        <i className={classes.icon}></i> {item.name} {this.getBadge(item.badge)}
                    </NavLink>
                }
            </NavItem>
        )
    };

    getNavDropdown = (item, key) => {
        return (
            <li key={key} className={this.activeRoute(item.url, this.props)}>
                <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}>
                    <i className={item.icon}></i> {item.name}
                </a>
                <ul className="nav-dropdown-items">
                    {this.getNavList(item.children)}
                </ul>
            </li>)
    };

    getNavItem = (item, key) => {
        const classes = {
            item: classNames(item.class),
            link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
            icon: classNames(item.icon)
        };
        return (
            this.getNavLink(item, key, classes)
        )
    };

    wrapper = (item) => {
        return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name);
    };

    getBadge = (badge) => {
        if (badge) {
            const classes = classNames(badge.class);
            return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>)
        }
    };

    isExternal = (url) => {
        const link = url ? url.substring(0, 4) : '';
        return link === 'http';
    };

    getNavList(links) {
        return links.map((link, index) => this.getNavType(link, index));
    }

    render() {
        const {className, links = []} = this.props;
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <Nav>
                        {this.getNavList(links)}
                    </Nav>
                </nav>
            </div>
        );
    }
}