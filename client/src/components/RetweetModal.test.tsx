import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {RetweetModal} from './RetweetModal';

describe('RetweetModal', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<RetweetModal />);
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
});