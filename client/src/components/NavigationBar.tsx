import React from 'react';
import {connect} from 'react-redux';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import {setShowAddTweetModal} from '../redux/actions/Tweet';
import {logoutUser, setShowUserRegOrLoginModal} from '../redux/actions/User';

export interface IProps {
  logoutUser: () => void,
  setShowAddTweetModal: (bool: boolean) => void,
  setShowUserRegOrLoginModal: (bool: boolean) => void,
  userIsLoggedIn: boolean,
};

export class NavigationBar extends React.Component<IProps> {
  public handleLoginClick = () => {
    this.props.setShowUserRegOrLoginModal(true);
  };

  public handleLogoutClick = () => {
    this.props.logoutUser();
  };

  public handleAddTweetClick = () => {
    this.props.setShowAddTweetModal(true);
  };

  public determineToShowLoginOrLogoutButton = () => {
    if (this.props.userIsLoggedIn) {
      return <NavLink onClick={this.handleLogoutClick}>Logout</NavLink>;
    }

    return <NavLink onClick={this.handleLoginClick}>Login</NavLink>;
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
            {this.props.userIsLoggedIn ? <NavLink onClick={this.handleAddTweetClick}>Add Tweet</NavLink> : null}            
          </NavItem>
          <NavItem>
            {this.determineToShowLoginOrLogoutButton()}
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
};

const mapStateToProps = (state: any) => {
  return {
    userIsLoggedIn: state.userIsLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    setShowAddTweetModal: (bool: boolean) => dispatch(setShowAddTweetModal(bool)),
    setShowUserRegOrLoginModal: (bool: boolean) => dispatch(setShowUserRegOrLoginModal(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
