import React from 'react';

export const InfoCard = ({
      icon = '', classes='bg-primary', value='', title = '', button = {label: "View More", url: '#'}
}) => (
    <div className="card">
        <div className="clearfix p-0 card-body">
            <div className={`${classes} p-4 font-2xl mr-3 float-left`}>
                <i className={icon}></i>
            </div>
            <div className="h5 mb-0 text-primary mt-2">{value}</div>
            <div className="text-muted text-uppercase font-weight-bold font-xs">{title}</div>
        </div>
        <div className="px-3 py-2 card-footer">
            <a className="font-weight-bold font-xs btn-block text-muted"
                href={button.url}>{button.label} <i className="fas fa-angle-right float-right font-lg"></i>
            </a>
        </div>
    </div>
);