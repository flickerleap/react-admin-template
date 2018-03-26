import React from 'react';
import Navbar from "./Navbar";

const Header = ({title}) => (
    <Navbar title={title} className='navbar navbar-expand-lg navbar-dark bg-dark' />
);

export default Header;
