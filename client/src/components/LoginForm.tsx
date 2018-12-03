import * as React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';

class LoginForm extends React.Component<{}, {password: string, username: string, loginButtonPressed: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {
      loginButtonPressed: false,
      password: '',
      username: '',
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  public handleUsernameChange = (e: any) => {
    this.setState({username: e.target.value});
  };

  public handlePasswordChange = (e: any) => {
    this.setState({password: e.target.value});
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.setState({loginButtonPressed: true});

    if(this.state.username.length > 0 && this.state.password.length > 0) {
      // insert redux action call here
    };
  };

  public render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type='text'
            placeholder='Enter your username'
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type='password'
            placeholder='Enter your password'
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </FormGroup>
        <Button type='submit'>Login</Button>
      </Form>
    );
  };
};

export default LoginForm;
