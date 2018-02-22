import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "../components/Header";
import Nav from "../components/Nav";
import DashboardScreen from "../screens/DashboardScreen";

export const AdminLayout = () => (
    <div>
        <Header />
        <div className='container-fluid'>
            <div className='row flex-xl-nowrap'>
                <div className='col-lg-2 col-md-3 sidebar p-4 bg-light border-right'>
                    <div className='sidebar-sticky'>
                        <Nav className='nav flex-column' />
                    </div>
                </div>
                <div className='col-lg-10 col-md-9 content p-4 bg-white'>
                    <Switch>
                        <Route path='/' component={DashboardScreen} />
                    </Switch>
                </div>
            </div>
        </div>
    </div>
);
