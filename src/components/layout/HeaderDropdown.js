import React from 'react';
import {Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

export class HeaderDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    toggle = () => {
        this.setState(() => ({
            open: !this.state.open
        }));
    };

    getDropDownMenu() {
        const {item} = this.props;
        return (
            <Dropdown nav isOpen={this.state.open} toggle={this.toggle}>
                <DropdownToggle nav>
                    {item.icon && <i className={item.icon}></i>} {item.name}
                </DropdownToggle>
                <DropdownMenu right>
                    {
                        item.children.map((child, index) => (
                            <DropdownItem key={index} href={child.url}>
                                {child.icon && <i className={child.icon}></i>}
                                {child.name}
                                {child.badge && <Badge color={child.badge.variant}>{child.badge.text}</Badge>}
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        return this.getDropDownMenu();
    }
}