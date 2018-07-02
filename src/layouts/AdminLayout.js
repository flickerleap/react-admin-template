import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Footer, Header, Sidebar} from "../components/layout/layout";
import {Container} from 'reactstrap';

export class AdminLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: this.props.routes || []
        };
    }

    componentDidMount() {
        this.setState((prevState) => ({
            routes: prevState.routes.map((route) => {
                route.component = this.props.getComponent(route);
                route.exact = route.exact !== undefined ? route.exact : true;

                return route;
            })
        }));
    }

    render() {
        const {links = [], headerMenuItems = [], appConfig, ...rest} = this.props;

        return (
            <div className="app">
                <Header {...appConfig} menuItems={headerMenuItems}/>
                <div className='app-body'>
                    <Sidebar links={links} {...rest}/>
                    <main className="main">
                        <Container fluid>
                            <Switch>
                                {
                                    this.state.routes.map((route, index) => {
                                        return (
                                            <Route key={index} path={route.path} component={route.component}
                                                   exact={route.exact}/>
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