import React from 'react';
import {Link} from 'react-router-dom';

export const AccessDeniedScreen = () => (
    <div className="justify-content-center row">
        <div className="col col-md-6">
            <div className="clearfix">
                <h1 className="float-left display-3 mr-4">403</h1>
                <h4 className="pt-3">Oops!</h4>
                <p className="text-muted float-left">Sorry, you don't have access to this page.</p>
                <Link className="btn btn-info" to="/">Dashboard</Link>
            </div>
        </div>
    </div>
);