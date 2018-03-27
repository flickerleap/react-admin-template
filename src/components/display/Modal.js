import React from 'react';

export class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open:props.open
        };
    }

    open = () => {
        this.setState(() => ({
            open: true
        }));
    };

    close = () => {
        this.setState(() => ({
            open: false
        }));
    };

    afterOpen = () => {

    };

    render() {
        const {title, content, styles = {}} = this.props;
        return (
            <div>
                <Modal
                    isOpen={this.state.open}
                    onAfterOpen={this.afterOpen}
                    onRequestClose={this.close}
                    style={styles}
                    contentLabel={title}
                >
                    {content}
                </Modal>
            </div>
        );
    }
}