import React from 'react';
import {Link} from 'react-router-dom';

export const NotFoundScreen = () => (
    <div className="justify-content-center row">
        <div className="col col-md-6">
            <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Oops! You're lost.</h4>
                <p className="text-muted float-left">The page you are looking for was not found.</p>
                <Link className="btn btn-info" to="/">Dashboard</Link>
            </div>
        </div>
    </div>
);