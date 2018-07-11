import React from 'react';
import {Alert} from "reactstrap";

/**
 *
 */
export class ErrorBlock extends React.Component {
    render() {
        const {error} = this.props;
        return (
            <div>
            {
                <Alert color="danger">
                    {error}
                </Alert>
            }
            </div>
        );
    }
}