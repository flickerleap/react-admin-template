import React from 'react';
import {Alert} from "reactstrap";

/**
 *
 */
export class ErrorBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };
    }

    onDismiss = () => {
        this.setState(() => ({
            open: false
        }));
    };

    render() {
        const {error} = this.props;
        return (
            <Alert color="info" isOpen={this.state.open} toggle={this.onDismiss}>
                {error}
            </Alert>
        );
    }
}