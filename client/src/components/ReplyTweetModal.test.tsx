import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {ReplyTweetModal} from './ReplyTweetModal';

describe('ReplyTweetModal', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {
      addTweetApi: jest.fn(),
      date: Date.now(),
      replyId: 'asdfjn1231',
      showReplyTweetModal: true,
      toggleModalState: jest.fn(),
      tweetMessage: 'Hello there',
      username: 'someTestGuy',
    };
    wrapper = shallow(<ReplyTweetModal {...props} />);
  });

  it('should render <Modal />', () => {
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

  it('should render <Form />', () => {
    expect(wrapper.find('Form').length).toEqual(1);
  });

  it('should render <FormGroup />', () => {
    expect(wrapper.find('FormGroup').length).toEqual(1);
  });

  it('should render <Input />', () => {
    expect(wrapper.find('Input').length).toEqual(1);
  });

  it('should render <Button />', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });
});