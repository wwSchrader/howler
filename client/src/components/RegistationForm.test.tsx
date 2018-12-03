import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => wrapper= shallow(<RegistrationForm />));

  it('should rendera <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});