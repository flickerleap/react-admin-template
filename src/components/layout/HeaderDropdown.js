import React from 'react';
import {Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

export class HeaderDropdown extends React.Component {
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };
    }

    getDropDownMenu() {
        const {items, toggle} = this.props;
        return (
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav>
                    {toggle}
                </DropdownToggle>
                <DropdownMenu right>
                    {
                        items.map((item, index) => (
                            <DropdownItem key={index} href={item.url}>
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
        return (
            this.getDropDownMenu()
        );
    }
}