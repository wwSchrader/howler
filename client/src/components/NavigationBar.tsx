import React from 'react';
import {connect} from 'react-redux';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import {setShowAddTweetModal} from '../redux/actions/tweet';
import {setShowUserRegOrLoginModal} from '../redux/actions/user';

export interface IProps {
  setShowAddTweetModal: (bool: boolean) => void,
  setShowUserRegOrLoginModal: (bool: boolean) => void,
}

export class NavigationBar extends React.Component<IProps> {
  public handleLoginClick = () => {
    this.props.setShowUserRegOrLoginModal(true);
  };

  public handleAddTweetClick = () => {
    this.props.setShowAddTweetModal(true);
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
            <NavLink onClick={this.handleAddTweetClick}>Add Tweet</NavLink>
          </NavItem>
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
    setShowAddTweetModal: (bool: boolean) => dispatch(setShowAddTweetModal(bool)),
    setShowUserRegOrLoginModal: (bool: boolean) => dispatch(setShowUserRegOrLoginModal(bool)),
  };
};

export default connect(null, mapDispatchToProps)(NavigationBar);
