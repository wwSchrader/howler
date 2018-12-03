import React from 'react';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';

class NavigationBar extends React.Component {
  public render() {
    return (
      <Navbar className="d-flex" color='primary' dark={true} role='navigation' expand='md'>
        <Nav className="mr-auto" navbar={true}>
          <NavbarBrand>Howler</NavbarBrand>
          <NavItem active={true}>
            <NavLink href=''>Home</NavLink>
          </NavItem>
        </Nav>
        <Nav navbar={true}>
          <NavItem>
            <NavLink href=''>Login</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
};

export default NavigationBar;
