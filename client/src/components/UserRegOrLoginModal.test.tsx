import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import {Button} from 'reactstrap';
import '../setupTests';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import {UserRegOrLoginModal} from './UserRegOrLoginModal';

describe('UserRegOrLoginModal', () => {
  let wrapper: ShallowWrapper;
  let dispatches: any;
  
  beforeEach(() => {
    dispatches = {
      setShowUserRegOrLoginModal: jest.fn(),
      showUserRegOrLoginModal: true,
    }
    wrapper = shallow(<UserRegOrLoginModal {...dispatches}/>);
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

  it('should render a <ModalFooter />', () => {
    expect(wrapper.find('ModalFooter').length).toEqual(1);
  });

  it('should render a <Button />', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  it('should render a <LoginForm />', () => {
    wrapper.setState({isLoginModal: true});
    expect(wrapper.containsMatchingElement(<LoginForm />)).toEqual(true);
  });

  it('should render a <RegistrationForm />', () => {
    wrapper.setState({isLoginModal: false});
    expect(wrapper.containsMatchingElement(<RegistrationForm />)).toEqual(true);
  });

  describe('switchStatus function', () => {
    let instance: UserRegOrLoginModal;
    beforeEach(() => {
      wrapper = shallow(<UserRegOrLoginModal {...dispatches}/>)
      instance = wrapper.instance() as UserRegOrLoginModal;
    });

    it('should change isLoginModal to true', () => {
      wrapper.setState({isLoginModal: false});
      instance.switchStatus();
      expect(wrapper.state('isLoginModal')).toBe(true);
    });

    it('should change isLoginModal to false', () => {
      wrapper.setState({isLoginModal: true});
      instance.switchStatus();
      expect(wrapper.state('isLoginModal')).toBe(false);
    });
  });

  describe('decideWhichButtonToRender function', () => {
    let instance: UserRegOrLoginModal;
    beforeEach(() => {
      wrapper = shallow(<UserRegOrLoginModal {...dispatches}/>)
      instance = wrapper.instance() as UserRegOrLoginModal;
    });

    it('should return Button with text Register', () => {
      wrapper.setState({isLoginModal: true});
      const returnedButton = instance.decideWhichButtonToRender();
      expect(returnedButton).toEqual(<Button onClick={instance.switchStatus}>Register</Button>);
    });

    it('should return Button with text Login', () => {
      wrapper.setState({isLoginModal: false});
      const returnedButton = instance.decideWhichButtonToRender();
      expect(returnedButton).toEqual(<Button onClick={instance.switchStatus}>Login</Button>);
    });
  });

  describe('decideModalHeaderText function', () => {
    let instance: UserRegOrLoginModal;
    beforeEach(() => {
      wrapper = shallow(<UserRegOrLoginModal {...dispatches}/>);
      instance = wrapper.instance() as UserRegOrLoginModal;
    });

    it('should return string Login', () => {
      wrapper.setState({isLoginModal: true});
      expect(instance.decideModalHeaderText()).toEqual('Login');
    });

    it('should return string Register', () => {
      wrapper.setState({isLoginModal: false});
      expect(instance.decideModalHeaderText()).toEqual('Register');
    });
  });

  describe('toggleModal function', () => {
    let instance: UserRegOrLoginModal;
    beforeEach(() => {
      wrapper = shallow(<UserRegOrLoginModal {...dispatches}/>);
      instance = wrapper.instance() as UserRegOrLoginModal;
    });

    it('should call the setShowUserRegOrLoginModal redux action', () => {
      instance.toggleModal();
      expect(dispatches.setShowUserRegOrLoginModal.mock.calls.length).toBe(1);
    });
  });
});