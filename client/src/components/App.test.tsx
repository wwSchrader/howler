import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import App from './App';
import NavigationBar from './NavigationBar';
import UserRegOrLoginModal from './UserRegOrLoginModal';

describe('App', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => wrapper = shallow(<App />));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the NavigationBar component', () => {
    expect(wrapper.containsMatchingElement(<NavigationBar />)).toEqual(true);
  });

  it('should render the UserRegOrLoginModal component', () => {
    expect(wrapper.containsMatchingElement(<UserRegOrLoginModal />)).toEqual(true);
  });
});
