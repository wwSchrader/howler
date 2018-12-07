import React from 'react';
import {connect} from 'react-redux';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import {setShowUserRegOrLoginModal} from '../redux/actions/user';

export interface IProps {
  setShowUserRegOrLoginModal: (bool: boolean) => void,
}

export class NavigationBar extends React.Component<IProps> {
  public handleLoginClick = () => {
    this.props.setShowUserRegOrLoginModal(true);
  };

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
            <NavLink onClick={this.handleLoginClick}>Login</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setShowUserRegOrLoginModal: (bool: boolean) => dispatch(setShowUserRegOrLoginModal(bool)),
  };
};

export default connect(null, mapDispatchToProps)(NavigationBar);
