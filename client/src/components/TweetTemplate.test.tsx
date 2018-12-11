import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {TweetTemplate} from './TweetTemplate';

describe('TweetTemplate', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<TweetTemplate />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});