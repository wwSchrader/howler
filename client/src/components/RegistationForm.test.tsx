import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {RegistrationForm} from './RegistrationForm';

describe('RegistrationForm', () => {
  let wrapper: ShallowWrapper;
  let instance: RegistrationForm;
  let reduxProps: any;
  let props: any;

  beforeEach(() => {
    reduxProps = {
      registerUser: jest.fn(),
    };
    props = {
      email: '',
      password: '',
      registerButtonPressed: false,
      username: '',
    };
    wrapper= shallow(<RegistrationForm {...reduxProps}{...props}/>)
  });

  it('should render <Form />', () => {
    expect(wrapper.find('Form').length).toEqual(1);
  });

  it('should render <FormGroup />', () => {
    expect(wrapper.find('FormGroup').length).toEqual(3);
  });

  it('should render <Label />', () => {
    expect(wrapper.find('Label').length).toEqual(3);
  });

  it('should render <Input />', () => {
    expect(wrapper.find('Input').length).toEqual(3);
  });

  it('should render <Button />', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  describe('handleUsernameChange function', () => {
    beforeEach(() => {
      instance = wrapper.instance() as RegistrationForm;
    });

    it('should change the state for the username', () => {
      const newUsername = 'newUsername';
      wrapper.setState({username: ''});
      instance.handleUsernameChange({target: {value: newUsername}});
      expect(wrapper.state('username')).toEqual(newUsername);
    });
  });

  describe('handleEmailChange function', () => {
    beforeEach(() => {
      instance = wrapper.instance() as RegistrationForm;
    });

    it('should change the state for the email', () => {
      const newEmail = 'someemail@anywhere.com';
      wrapper.setState({email: ''});
      instance.handleEmailChange({target: {value: newEmail}});
      expect(wrapper.state('email')).toEqual(newEmail);
    });
  });

  describe('handlePasswordChange function', () => {
    beforeEach(() => {
      instance = wrapper.instance() as RegistrationForm;
    });

    it('should change the state for the password', () => {
      const newPassword = 'password123';
      wrapper.setState({password: ''});
      instance.handlePasswordChange({target: {value: newPassword}});
      expect(wrapper.state('password')).toEqual(newPassword);
    });
  });

  describe('handleSubmit function', () => {
    let mockPreventDefault: jest.Mock;
    beforeEach(() => {
      instance = wrapper.instance() as RegistrationForm;
      mockPreventDefault = jest.fn(() => null);
    });

    it('should handle valid submission', () => {
      const testState = {
        email: 'validemail@gmail.com',
        password: 'anungussablepassword',
        registerButtonPressed: false,
        username: 'TestUsername',
      };

      wrapper.setState(testState);

      instance.handleSubmit({preventDefault: mockPreventDefault});
      expect(mockPreventDefault.mock.calls.length).toEqual(1);
      expect(wrapper.state('registerButtonPressed')).toEqual(true);
      expect(reduxProps.registerUser.mock.calls.length).toEqual(1);
      expect(reduxProps.registerUser.mock.calls[0][0]).toBe(testState.username);
      expect(reduxProps.registerUser.mock.calls[0][1]).toBe(testState.email);
      expect(reduxProps.registerUser.mock.calls[0][2]).toBe(testState.password);
    });

    it('should reject no username submission', () => {
      const testState = {
        email: 'validemail@gmail.com',
        password: 'anungussablepassword',
        registerButtonPressed: false,
        username: '',
      };

      wrapper.setState(testState);

      instance.handleSubmit({preventDefault: mockPreventDefault});
      expect(mockPreventDefault.mock.calls.length).toEqual(1);
      expect(wrapper.state('registerButtonPressed')).toEqual(true);
      expect(reduxProps.registerUser.mock.calls.length).toEqual(0);
    });

    it('should reject no password submission', () => {
      const testState = {
        email: 'validemail@gmail.com',
        password: '',
        registerButtonPressed: false,
        username: 'TestUsername',
      };

      wrapper.setState(testState);

      instance.handleSubmit({preventDefault: mockPreventDefault});
      expect(mockPreventDefault.mock.calls.length).toEqual(1);
      expect(wrapper.state('registerButtonPressed')).toEqual(true);
      expect(reduxProps.registerUser.mock.calls.length).toEqual(0);
    });

    it('should reject no email submission', () => {
      const testState = {
        email: '',
        password: 'anungussablepassword',
        registerButtonPressed: false,
        username: 'TestUsername',
      };
  
      wrapper.setState(testState);

      instance.handleSubmit({preventDefault: mockPreventDefault});
      expect(mockPreventDefault.mock.calls.length).toEqual(1);
      expect(wrapper.state('registerButtonPressed')).toEqual(true);
      expect(reduxProps.registerUser.mock.calls.length).toEqual(0);
    });
  });
});