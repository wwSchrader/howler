import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {LoginForm} from './LoginForm';

describe('LoginForm', () => {
  let wrapper: ShallowWrapper;
  let instance: LoginForm;
  let reduxProps: any;
  let props: any;

  beforeEach(() => {
    reduxProps = {
      loginUser: jest.fn(),
    };

    props = {
      loginButtonPressed: false,
      password: '',
      username: '',
    };

    wrapper = shallow(<LoginForm {...reduxProps} {...props}/>)
  });

  it('should render a <Form />', () => {
    expect(wrapper.find('Form').length).toEqual(1);
  });

  it('should render <FormGroup />', () => {
    expect(wrapper.find('FormGroup').length).toEqual(2);
  });

  it('should render <Label />', () => {
    expect(wrapper.find('Label').length).toEqual(2);
  });

  it('should render <Input />', () => {
    expect(wrapper.find('Input').length).toEqual(2);
  });

  it('should render <Button />', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  describe('handleUsernameChange function', () => {
    beforeEach(() => {
      instance = wrapper.instance() as LoginForm;
    });

    it('should change the state for username', () => {
      const newUsername = 'newUsername';
      wrapper.setState({username: ''});
      instance.handleUsernameChange({target: {value: newUsername}});
      expect(wrapper.state('username')).toEqual(newUsername);
    });
  });

  describe('handlePasswordChange function', () => {
    beforeEach(() => {
      instance = wrapper.instance() as LoginForm;
    });

    it('should change the state for password', () => {
      const newPassword = 'password123';
      wrapper.setState({username: ''});
      instance.handleUsernameChange({target: {value: newPassword}});
      expect(wrapper.state('username')).toEqual(newPassword);
    });
  });

  describe('handleSubmit function', () => {
    let mockPreventDefault: jest.Mock;
    beforeEach(() => {
      instance = wrapper.instance() as LoginForm;
      mockPreventDefault = jest.fn(() => null);
    });

    it('should handle valid submission', () => {
      const testState = {
        loginButtonPressed: false,
        password: 'validPassword',
        username: 'validusername',
      }
      wrapper.setState(testState);
      
      instance.handleSubmit({preventDefault: mockPreventDefault});
      expect(mockPreventDefault.mock.calls.length).toEqual(1);
      expect(wrapper.state('loginButtonPressed')).toEqual(true);
      expect(reduxProps.loginUser.mock.calls.length).toEqual(1);
      expect(reduxProps.loginUser.mock.calls[0][0]).toBe(testState.username);
      expect(reduxProps.loginUser.mock.calls[0][1]).toBe(testState.password);
    });

    it('should reject no username submission', () => {
      const testState = {
        loginButtonPressed: false,
        password: 'validPassword',
        username: '',
      }
      wrapper.setState(testState);
      
      instance.handleSubmit({preventDefault: mockPreventDefault});
      expect(mockPreventDefault.mock.calls.length).toEqual(1);
      expect(wrapper.state('loginButtonPressed')).toEqual(true);
      expect(reduxProps.loginUser.mock.calls.length).toEqual(0);
    });

    it('should reject no password submission', () => {
      const testState = {
        loginButtonPressed: false,
        password: '',
        username: 'validusername',
      }
      wrapper.setState(testState);
      
      instance.handleSubmit({preventDefault: mockPreventDefault});
      expect(mockPreventDefault.mock.calls.length).toEqual(1);
      expect(wrapper.state('loginButtonPressed')).toEqual(true);
      expect(reduxProps.loginUser.mock.calls.length).toEqual(0);
    });
  });
});