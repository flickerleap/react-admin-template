import React, {Component} from 'react';
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown
} from 'reactstrap';

class HeaderDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    getDropDownMenu() {
        const {items, toggle} = this.props;
        return (
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav>
                    {toggle}
                </DropdownToggle>
                <DropdownMenu right>
                    {
                        items.map((item) => (
                            <DropdownItem>
                                {item.icon && <i className={item.icon}></i>}
                                {item.name}
                                {item.badge && <Badge color={item.badge.variant}>{item.badge.text}</Badge>}
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        const {...attributes} = this.props;
        return (
            this.getDropDownMenu()
        );
    }
}

export default HeaderDropdown;