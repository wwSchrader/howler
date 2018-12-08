import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {AddTweetForm} from './AddTweetForm';

describe('AddTweetForm', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<AddTweetForm />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});