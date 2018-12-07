import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {AddTweetModal} from './AddTweetModal';

describe('AddTweetModal', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<AddTweetModal />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});