import React from 'react';
import {Nav, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Link} from "react-router-dom";
import {Menu} from "./Menu";

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    sidebarToggle = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    };

    sidebarMinimize = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    };

    mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    };

    asideToggle = (e) => {
        e.preventDefault();

        document.body.classList.toggle('aside-menu-hidden');
    };

    render() {
        const {title, rootUrl = '/', logo = undefined, menuItems = []} = this.props;
        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <NavbarBrand href={rootUrl}>
                    {logo !== undefined ? <img src={logo} alt="Logo"/> : <span>{title}</span>}
                </NavbarBrand>
                <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <Nav className="ml-auto navbar-nav">
                    {
                        <Menu key="header-menu" type='header' items={menuItems} />
                    }
                </Nav>
            </header>
        );
    }
}
