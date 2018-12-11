import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import AddTweetForm from './AddTweetForm';
import {AddTweetModal} from './AddTweetModal';

describe('AddTweetModal', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {
      setShowAddTweetModal: jest.fn(),
      showAddTweetModal: false,
    }
    wrapper = shallow(<AddTweetModal {...props}/>);
  });

  it('should render a <Modal />', () => {
    expect(wrapper.find('Modal').length).toEqual(1);
  });

  it('should render a <ModalHeader />', () => {
    expect(wrapper.find('ModalHeader').length).toEqual(1);
  });

  it('should render a <ModalBody />', () => {
    expect(wrapper.find('ModalBody').length).toEqual(1);
  });

  it('should render <AddTweetForm />', () => {
    expect(wrapper.containsMatchingElement(<AddTweetForm />)).toEqual(true);
  });

  describe('toogleModal function', () => {
    let instance: AddTweetModal;
    beforeEach(() => {
      instance = wrapper.instance() as AddTweetModal;
    });

    it('Should call the setShowAddTweetModal', () => {
      instance.toogleModal();
      expect(props.setShowAddTweetModal.mock.calls.length).toEqual(1);
    });
  });
});