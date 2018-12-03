import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import UserRegOrLoginModal from './UserRegOrLoginModal';

describe('UserRegOrLoginModal', () => {
  let wrapper: ShallowWrapper;
  
  beforeEach(() => wrapper = shallow(<UserRegOrLoginModal />));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});