import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {RetweetModal} from './RetweetModal';

describe('RetweetModal', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {
      date: Date.now(),
      replyId: 'asdfjn1231',
      showRetweetModal: true,
      toggleModalState: jest.fn(),
      tweetMessage: 'Hello there',
      username: 'someTestGuy',
    };
    wrapper = shallow(<RetweetModal {...props}/>);
  });

  it('Should render <Modal />', () => {
    expect(wrapper.find('Modal').length).toEqual(1);
  });

  it('should render <ModalHeader />', () => {
    expect(wrapper.find('ModalHeader').length).toEqual(1);
  });

  it('should render <ModalBody />', () => {
    expect(wrapper.find('ModalBody').length).toEqual(1);
  });

  it('should render <TweetTemplate />', () => {
    expect(wrapper.find('TweetTemplate').length).toEqual(1);
  });
});