import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {registerUser} from '../redux/actions/User';

export interface IPropsFromRedux {
  registerUser: (usernam: string, email: string, password: string) => void,
}

export interface IProps {
  email: string,
  registerButtonPressed: boolean,
  username: string,
  password: string
}

export class RegistrationForm extends React.Component<IPropsFromRedux, IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      registerButtonPressed: false,
      username: '',
    };
  };

  public handleUsernameChange = (e: any) => {
    this.setState({username: e.target.value});
  };

  public handleEmailChange = (e: any) => {
    this.setState({email: e.target.value});
  };

  public handlePasswordChange = (e: any) => {
    this.setState({password: e.target.value});
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.setState({registerButtonPressed: true});

    if(this.state.username.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    ) {
      this.props.registerUser(
        this.state.username,
        this.state.email,
        this.state.password
      );
    };
  };

  public render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type='text'
            placeholder='Enter a username'
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type='email'
            placeholder='Enter an email'
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type='password'
            placeholder='Enter a password'
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </FormGroup>
        <Button>Register</Button>
      </Form>
    );
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    registerUser:
      (usernam: string, userEmail: string, userPassword: string) => dispatch(
        registerUser(usernam, userEmail, userPassword)
      ),
  };
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
