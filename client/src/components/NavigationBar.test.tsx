import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => wrapper = shallow(<NavigationBar />));

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
});
