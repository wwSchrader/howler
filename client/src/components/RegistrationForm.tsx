import * as React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';

class RegistrationForm extends React.Component<{}, {email: string, registerButtonPressed: boolean, username: string, password: string}> {
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

export default RegistrationForm;
