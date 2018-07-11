import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Footer, Header, Sidebar} from "../components/layout/layout";
import {Container} from 'reactstrap';

export class AdminLayout extends React.Component {
    render() {
        const {routes = [], links = [], headerMenuItems = [], appConfig, getComponent, ...rest} = this.props;

        return (
            <div className="app">
                <Header {...appConfig} menuItems={headerMenuItems}/>
                <div className='app-body'>
                    <Sidebar links={links} {...rest}/>
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

                <Footer copyright={appConfig.copyright}/>
            </div>
        );
    }
}