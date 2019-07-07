import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import {RetweetTemplate} from './RetweetTemplate';

describe('RetweetTemplate', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<RetweetTemplate />);
  });

  it('should remder <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});