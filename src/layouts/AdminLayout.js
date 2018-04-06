import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header, Footer, Aside, Sidebar} from "../components/layout/layout";
import {Container} from 'reactstrap';

export const AdminLayout = ({routes = [], links = [], getComponent, appConfig}) => (
    <div className="app">
        <Header {...appConfig}/>
        <div className='app-body'>
            <Sidebar className='nav flex-column' links={links}/>
            <main className="main">
                <Container fluid>
                    <Switch>
                        {
                            routes.map((route, index) => {
                                return (
                                    <Route key={index} path={route.path} component={getComponent(route)}
                                        exact={route.exact !== undefined ? route.exact : false} />
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