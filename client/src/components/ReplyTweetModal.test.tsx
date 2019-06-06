import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import ReplyTweetModal from './ReplyTweetModal';

describe('ReplyTweetModal', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {
      toggleModalState: jest.fn(),
    }
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

  it('should render <div />', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('should render <span />', () => {
    expect(wrapper.find('span').length).toEqual(2);
  });

  it('should render <b />', () => {
    expect(wrapper.find('b').length).toEqual(1);
  });

  it('should render <p />', () => {
    expect(wrapper.find('p').length).toEqual(2);
  });
});