import React from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
import {connect} from "react-redux";
import {HeaderDropdown} from "./HeaderDropdown";
import {canAccess, getAbilitiesFromLinks, getAbilitiesFromUser} from "../../helpers/authorization";
import {getUser} from "../../store/actions/auth";
import {getUserFromState} from "../../helpers/auth";

/**
 * Generate a menu from the given links
 *
 * @param {string} className
 * @param {Object[]} links
 * @param {string} links[].path URL to set as the NavLink's "to" prop
 * @param {string} links[].label Name of the link
 * @param {string} links[].icon Icon to use
 * @returns {MenuComponent}
 */
class MenuComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            type: this.props.type ? this.props.type : 'sidebar',
            list: []
        };
    }

    componentDidMount() {
        const {items = []} = this.props;

        if (this.props.user === {}) {
            this.props.getUser().then((action) => {
                this.setState(() => ({
                    loading: false,
                    list: this.getNavList(items)
                }));
            });
        } else {
            this.setState(() => ({
                loading: false,
                list: this.getNavList(items)
            }));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState(() => ({
                loading: false,
                list: this.getNavList(this.props.items)
            }))
        }
    }

    componentWillUnmount() {
        this.setState(() => ({
            loading: false,
            list: []
        }));
    }

    onClick = (event) => {
        event.preventDefault();
        const menuItems = document.querySelectorAll('.nav-dropdown.open');
        menuItems.forEach((item) => {
            item.classList.remove('open');
        });

        event.target.parentElement.classList.add('open');
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
        const url = this.processUrl(item);

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
        const boundItem = {
            ...item,
            children: item.children.map((child) => ({
                ...child,
                url: this.processUrl(child)
            })),
            url: this.processUrl(item),
        };

        return <HeaderDropdown key={key} item={boundItem}/>;
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
            return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>);
        }
    };

    isExternal = (url) => {
        const link = url ? url.substring(0, 4) : '';
        return link === 'http';
    };

    processUrl = (item) => {
        if (item.toBind) {
            let url = item.url.toString();
            item.toBind.forEach((toBindItem) => {
                url = url.replace(toBindItem.key, toBindItem.valueFn(this.props));
            });

            return url;
        }

        return item.url;
    };

    getNavList(links = []) {
        let index = 0;
        return links.reduce((list, link) => {
            if (this.hasAccess(link)) {
                list.push(this.getNavType(link, index));
                index++;
            }

            return list;
        }, []);
    }

    hasAccess(link) {
        const {abilities = []} = this.props.user;
        const userAbilities = getAbilitiesFromUser(abilities);
        const neededAbilities = getAbilitiesFromLinks([link]);

        return canAccess(userAbilities, neededAbilities);
    }

    render() {
        return this.state.list;
    }
}

const mapStateToProps = (state) => ({
    user: getUserFromState(state)
});

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser())
});

export const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);