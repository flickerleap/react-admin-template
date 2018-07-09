import React from 'react';
import {Alert} from "reactstrap";

/**
 *
 */
export class ErrorBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    componentDidMount() {
        this.setState(() => ({
            open: this.props.error !== undefined
        }));
    }

    componentDidUpdate(prevProps) {
        if(this.props.error !== prevProps.error) {
            this.setState(() => ({
                open: this.props.error !== undefined
            }));
        }
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