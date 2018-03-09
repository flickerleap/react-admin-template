import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom';
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import DashboardScreen from "../screens/DashboardScreen";
import OutlineScreen from "../screens/Outline/OutlineScreen";
import AddOutlineScreen from "../screens/Outline/AddOutlineScreen";
import EditOutlineScreen from "../screens/Outline/EditOutlineScreen";
import MeetingTypeScreen from "../screens/MeetingType/MeetingTypeScreen";
import CampusScreen from "../screens/Campus/CampusScreen";
import AddCampusScreen from "../screens/Campus/AddCampusScreen";
import AddMeetingTypeScreen from "../screens/MeetingType/AddMeetingTypeScreen";

export const AdminLayout = ({ routes = []}) => (
    <div>
        <Header />
        <div className='container-fluid'>
            <div className='row flex-xl-nowrap'>
                <div className='col-lg-2 col-md-3 sidebar p-4 bg-light border-right'>
                    <div className='sidebar-sticky'>
                        <Nav className='nav flex-column' links={
                            routes.map((route) => {
                                if(route.excludeFromNav === undefined || route.excludeFromNav !== true)
                                {
                                    return <NavLink className="nav-link" to={route.path}>{route.label}</NavLink>;
                                }
                            })
                        } />
                    </div>
                </div>
                <div className='col-lg-10 col-md-9 content p-4 bg-white'>
                    <Switch>
                        {
                            routes.map((route, index) => (
                                <Route key={index} path={route.path} component={route.component} exact={route.exact !== undefined ? route.exact : false} />
                            ))
                        }
                    </Switch>
                </div>
            </div>
        </div>
    </div>
);
