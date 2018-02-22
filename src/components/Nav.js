import React from 'react';

const Nav = ({className}) => (
    <ul className={className}>
        <li className="nav-item">
            <a className="nav-link active" href="#">Active</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
        </li>
    </ul>
);

export default Nav;
