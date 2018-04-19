import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Footer, Header, Sidebar} from "../components/layout/layout";
import {Container} from 'reactstrap';
import Popup from 'react-popup';

export const AdminLayout = ({routes = [], links = [], dropDownMenus = [], getComponent, appConfig, ...rest}) => (
    <div className="app">
        <Header {...appConfig} dropDownMenus={dropDownMenus}/>
        <Popup />
        <div className='app-body'>
            <Sidebar links={links} {...rest}/>
            <main className="main">
                <Container fluid>
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
                </Container>
            </main>
        </div>

        <Footer copyright={appConfig.copyright}/>
    </div>
);