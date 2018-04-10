import React from 'react';
import HeaderDropdown from './HeaderDropdown';
import {
    Nav,
    NavItem,
    NavbarToggler,
    NavLink,
    NavbarBrand,
} from 'reactstrap';

export class Header extends React.Component {

    sidebarToggle = (e) => {
        e.preventDefault();
        console.log(e);
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
        const {rootUrl = '/', title, logo = undefined, items = []} = this.props;
        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <NavbarBrand href={rootUrl}>
                    {logo !== undefined ? <img src={logo} alt="Logo" /> : <span>{title}</span>}
                </NavbarBrand>
                <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <Nav className="ml-auto" navbar>
                    {items.length > 0 && <HeaderDropdown items={items} toggle={<i className="fas fa-user"></i>}/>}
                </Nav>
            </header>
        );
    }
}
