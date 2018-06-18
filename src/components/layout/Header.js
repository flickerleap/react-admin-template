import React from 'react';
import {Nav, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Link} from "react-router-dom";

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
        const {rootUrl = '/', title, logo = undefined, dropDownMenus = [], menuItems = []} = this.props;
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
                <Nav className="pull-left" navbar>
                    {
                        menuItems.map((item, index) => (
                            <li key={index} className="nav-item active">
                                <Link className="nav-link" to={item.url}>{item.name}</Link>
                            </li>
                        ))
                    }
                </Nav>
                <Nav className="ml-auto" navbar>
                    {
                        dropDownMenus.map((menu, index) => (
                            <div key={index}>{menu}</div>
                        ))
                    }
                </Nav>
            </header>
        );
    }
}
