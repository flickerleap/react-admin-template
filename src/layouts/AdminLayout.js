import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";

export const AdminLayout = ({routes = [], links = [], getComponent, appConfig}) => (
    <div>
        <Header {...appConfig}/>
        <div className='container-fluid'>
            <div className='row flex-xl-nowrap'>
                <div className='col-lg-2 col-md-3 sidebar p-4 bg-light border-right'>
                    <div className='sidebar-sticky'>
                        <Nav className='nav flex-column' links={links}/>
                    </div>
                </div>
                <div className='col-lg-10 col-md-9 content p-4 bg-white'>
                    <Switch>
                        {
                            routes.map((route, index) => {
                                return (
                                    <Route key={index} path={route.path} component={getComponent(route)}
                                           exact={route.exact !== undefined ? route.exact : false}/>
                                );
                            })
                        }
                    </Switch>
                </div>
            </div>
        </div>
    </div>
);

export default AdminLayout;