import React from 'react';

export const PublicLayout = (routes = [], links = [], headerMenuItems = [], appConfig, getComponent, ...rest) => {

    return (
        <div className="app flex-row align-items-center">
            <div className="container">
                <div className="justify-content-center row">
                    <div className="col col-md-8">
                        <div className="card-group">
                            <div className="p-4 card">
                                <div className="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};