import React from 'react';
import moment from 'moment';

export class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {copyright} = this.props;
        const year = moment().format('Y');
        return (
            <footer className="app-footer">
                <span><a href={copyright.url}>{copyright.name}</a> &copy; {year} {copyright.company}</span>
            </footer>
        )
    }
}