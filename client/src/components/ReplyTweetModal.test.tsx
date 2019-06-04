import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import ReplyTweetModal from './ReplyTweetModal';


describe('ReplyTweetModal', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ReplyTweetModal />);
  });

  it('should render <Modal />', () => {
    expect(wrapper.find('Modal').length).toEqual(1);
  });

  it('should render <ModalBody />', () => {
    expect(wrapper.find('ModalBody').length).toEqual(1);
  });
});