import React from 'react';
import {Nav, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Menu} from "./Menu";
import {connect} from "react-redux";

class HeaderComponent extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            this.sidebarToggle(new Event('sidebar'));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.loggedIn !== prevProps.loggedIn) {
            this.sidebarToggle(new Event('sidebar'));
        }
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
        const {title, rootUrl = '/', logo = undefined, menuItems = [], loggedIn = false} = this.props;

        return (
            <header className="app-header navbar">
                {
                    loggedIn &&
                    <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                        <span className="navbar-toggler-icon"></span>
                    </NavbarToggler>
                }
                <NavbarBrand href={rootUrl}>
                    {logo !== undefined ? <img src={logo} alt="Logo"/> : <span>{title}</span>}
                </NavbarBrand>
                {
                    loggedIn &&
                    <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
                        <span className="navbar-toggler-icon"></span>
                    </NavbarToggler>
                }
                <Nav className="ml-auto navbar-nav">
                    {
                        <Menu key="header-menu" type='header' items={menuItems}/>
                    }
                </Nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: !!state.auth.accessToken
});

export const Header = connect(mapStateToProps)(HeaderComponent);
