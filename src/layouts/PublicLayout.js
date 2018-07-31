import React from 'react';
import {Route, Switch} from "react-router-dom";
import {Container} from "reactstrap";
import {Header} from "../components/layout/Header";

export const PublicLayout = ({routes = [], links = [], headerMenuItems = [], appConfig, getComponent, ...rest}) => {

    return (
        <div className="app">
            <Header {...appConfig} menuItems={[]} showToggle={false}/>
            <div className='app-body'>
                <main className="main">
                    <Container fluid>
                        <Switch>
                            {
                                routes.map((route, index) => {
                                    const component = getComponent(route);
                                    const exact = route.exact !== undefined ? route.exact : true;
                                    return (
                                        <Route key={index} path={route.path} component={component}
                                               exact={exact}/>
                                    );
                                })
                            }
                        </Switch>
                    </Container>
                </main>
            </div>
        </div>
    );
};