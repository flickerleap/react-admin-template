import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = ({className = 'nav', title}) => (
    <nav className={className}>
        <a className="navbar-brand" href="#">{title}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">&nbsp;</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;
