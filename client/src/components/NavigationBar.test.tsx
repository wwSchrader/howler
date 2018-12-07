import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {NavigationBar} from './NavigationBar';

describe('NavigationBar', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {setShowUserRegOrLoginModal: jest.fn()}
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
    expect(wrapper.find('NavItem').length).toEqual(2);
  });

  it('should render <NavLink />', () => {
    expect(wrapper.find('NavLink').length).toEqual(2);
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
});
