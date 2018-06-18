import React from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
import {connect} from "react-redux";
import {HeaderDropdown} from "./HeaderDropdown";
import {getUser} from "../../store/actions/auth";

/**
 * Generate a menu from the given links
 *
 * @param {string} className
 * @param {Object[]} links
 * @param {string} links[].path URL to set as the NavLink's "to" prop
 * @param {string} links[].label Name of the link
 * @param {string} links[].icon Icon to use
 * @returns {Menu}
 * @constructor
 */
class MenuComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            type: this.props.type ? this.props.type : 'sidebar'
        };
    }

    componentDidMount() {
        const {getUser} = this.props;

        getUser().then((action) => {
            this.setState(()=>({
                loading: false
            }));
        });
    }

    onClick = (e) => {
        e.preventDefault();
        switch (this.state.type) {
            // case 'header':
            //     e.target.parentElement.parentElement.classList.toggle('show');
            //     const expanded = e.target.getAttribute('aria-expanded');
            //     console.log((!expanded).toString());
            //     e.target.setAttribute('aria-expanded', (!expanded).toString());
            //     break;
            default:
                e.target.parentElement.classList.toggle('open');
                break;
        }
    };

    activeRoute = (routeName) => {
        switch (this.state.type) {
            case 'header':
                return window.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
            default:
                return window.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
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

    getDivider = (divider, key) => {
        const classes = classNames('divider', divider.class);

        return (
            <li key={key} className={classes}>
            </li>
        );
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

        return this.getNavLink(item, key, classes);
    };

    getTitle = (item, key) => {
        const classes = {
            item: classNames('hidden-cn', item.class),
            link: classNames('nav-label', item.class ? item.class : ''),
            icon: classNames(
                !item.icon ? 'fas fa-circle' : item.icon,
                item.label.variant ? `text-${item.label.variant}` : '',
                item.label.class ? item.label.class : ''
            )
        };

        return this.getNavLink(item, key, classes);
    };

    getNavLink = (item, key, classes) => {
        const url = item.url ? item.url : '';

        return (
            <NavItem key={key} className={classes.item}>
                {
                    this.isExternal(url) ?
                        <RsNavLink href={url} className={classes.link} active>
                            <i className={classes.icon}></i> {item.name} {this.getBadge(item.badge)}
                        </RsNavLink>
                        :
                        <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
                            <i className={classes.icon}></i> {item.name} {this.getBadge(item.badge)}
                        </NavLink>
                }
            </NavItem>
        );
    };

    getNavDropdown = (item, key) => {
        switch (this.state.type) {
            case 'header':
                return this.getHeaderDropdown(item, key);
            default:
                return this.getSidebarDropdown(item, key);
        }
    };

    getSidebarDropdown(item, key) {
        return (
            <li key={key} className={this.activeRoute(item.url)}>
                <a
                    className="nav-link nav-dropdown-toggle"
                    href="#"
                    onClick={this.onClick}
                >
                    {item.icon && <i className={item.icon}></i>} {item.name}
                </a>
                <ul className="nav-dropdown-items">
                    {this.getNavList(item.children)}
                </ul>
            </li>
        );
    }

    getHeaderDropdown = (item, key) => {
        return <HeaderDropdown key={key} item={item}/>;
    };

    getNavItem = (item, key) => {
        const classes = {
            item: classNames(item.class),
            link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
            icon: classNames(item.icon)
        };

        return this.getNavLink(item, key, classes);
    };

    wrapper = (item) => {
        return (
            item.wrapper && item.wrapper.element ?
                (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name))
                : item.name
        );
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
        return links.map((link, index) => {
            if (this.hasAccess(link)) {
                return this.getNavType(link, index);
            }
        });
    }

    hasAccess() {
        const {roles = [], abilities = []} = this.props.user;
        console.log(roles, abilities);
        let status = !(roles.length > 0);
        abilities.forEach((role) => {
            status = roles.indexOf(role) > -1 || status;
        });

        return status;
    }

    render() {
        const {items = []} = this.props;
        return this.getNavList(items);
    }
}

const mapStateToProps = (state) => ({
    user: state.auth ? state.auth.user : {}
});

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser())
});

export const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);