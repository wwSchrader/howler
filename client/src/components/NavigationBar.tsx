import React from 'react';
import {connect} from 'react-redux';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import coyote from '../assets/coyote.jpg';
import {setNavigationState} from '../redux/actions/Navigation';
import {setShowAddTweetModal} from '../redux/actions/Tweet';
import {logoutUser, setShowUserRegOrLoginModal} from '../redux/actions/User';
import './NavigationBar.css';

export interface IProps {
  logoutUser: () => void,
  navigationState: string,
  setNavigationState: (state: string) => void,
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

  public handleHomeNavClick = () => {
    this.props.setNavigationState('Home');
  };

  public handleMyHowlsNavClick = () => {
    this.props.setNavigationState('User');
  };

  public determineToShowLoginOrLogoutButton = () => {
    if (this.props.userIsLoggedIn) {
      return <NavLink onClick={this.handleLogoutClick}>Logout</NavLink>;
    }

    return <NavLink onClick={this.handleLoginClick}>Login</NavLink>;
  };

  public determinToShowMyHowlsButton = () => {
    if (this.props.userIsLoggedIn) {
      return (
        <NavItem>
          <NavLink active={this.props.navigationState === 'User'} href='#' onClick={this.handleMyHowlsNavClick}>My Howls</NavLink>
        </NavItem>
      );
    };

    return null;
  };

  public render() {
    return (
      <Navbar className="d-flex" color='primary' dark={true} role='navigation' expand='md'>
        <Nav className="mr-auto" navbar={true}>
          <img className='Coyote' src={coyote}/>
          <NavbarBrand>
            Howler
          </NavbarBrand>
          <NavItem active={this.props.navigationState === 'Home'}>
            <NavLink href='#' onClick={this.handleHomeNavClick}>Home</NavLink>
          </NavItem>
          {this.determinToShowMyHowlsButton()}
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
    navigationState: state.setNavigationState,
    userIsLoggedIn: state.userIsLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    setNavigationState: (state: string) => dispatch(setNavigationState(state)),
    setShowAddTweetModal: (bool: boolean) => dispatch(setShowAddTweetModal(bool)),
    setShowUserRegOrLoginModal: (bool: boolean) => dispatch(setShowUserRegOrLoginModal(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
