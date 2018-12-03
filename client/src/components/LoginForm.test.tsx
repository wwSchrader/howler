import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => wrapper = shallow(<LoginForm />));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});