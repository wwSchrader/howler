import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {NavigationBar} from './NavigationBar';

describe('NavigationBar', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {
      logoutUser: jest.fn(),
      setShowAddTweetModal: jest.fn(),
      setShowUserRegOrLoginModal: jest.fn(),
      userIsLoggedIn: false,
    }
    wrapper = shallow(<NavigationBar {...props}/>)
  });

  it('should render a <Navbar />', () => {
    expect(wrapper.find('Navbar').length).toEqual(1);
  });

  it('should render a <NavbarBrand />', () => {
    expect(wrapper.find('NavbarBrand').length).toEqual(1);
  });

  it('should render <Nav />', () => {
    expect(wrapper.find('Nav').length).toEqual(2);
  });

  it('should render <NavItem />', () => {
    expect(wrapper.find('NavItem').length).toEqual(3);
  });

  it('should render <NavLink />', () => {
    expect(wrapper.find('NavLink').length).toEqual(3);
  });

  describe('handleLoginClick function', () => {
    let instance: NavigationBar;
    beforeEach(() => {
      instance = wrapper.instance() as NavigationBar;
    });

    it('should call the setShowUserRegOrLoginModal redux action', () => {
      instance.handleLoginClick();
      expect(props.setShowUserRegOrLoginModal.mock.calls.length).toEqual(1);
    });
  });

  describe('handle LogoutClick function', () => {
    let instance: NavigationBar;
    beforeEach(() => {
      instance = wrapper.instance() as NavigationBar;
    });

    it('should call the setShowUserRegOrLoginModal redux action', () => {
      instance.handleLogoutClick();
      expect(props.logoutUser.mock.calls.length).toEqual(1);
    });
  });

  describe('handleAddTweetClick function', () => {
    let instance: NavigationBar;
    beforeEach(() => {
      instance = wrapper.instance() as NavigationBar;
    });

    it('should call the setShowUserRegOrLoginModal redux action', () => {
      instance.handleAddTweetClick();
      expect(props.setShowAddTweetModal.mock.calls.length).toEqual(1);
    });
  });
});
