import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {loginUser} from '../redux/actions/User';

export interface IPropsFromRedux {
  loginUser: (usernam: string, userPassword: string) => void,
}

export interface IProps {
  password: string,
  username: string,
  loginButtonPressed: boolean
};

export class LoginForm extends React.Component<IPropsFromRedux, IProps> {
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
      this.props.loginUser(this.state.username, this.state.password);
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: (usernam: string, userPassword: string) => dispatch(loginUser(usernam, userPassword)),
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);
