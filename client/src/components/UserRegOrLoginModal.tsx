import * as React from 'react';
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import LoginForm from './LoginForm';

class UserRegOrLoginModal extends React.Component<{}, {isLoginModal: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoginModal: true,
    };

    this.switchStatus = this.switchStatus.bind(this);
    this.decideWhichButtonToRender = this.decideWhichButtonToRender.bind(this);
    this.decideModalHeaderText = this.decideModalHeaderText.bind(this);
  }

  public render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>{this.decideModalHeaderText()}</ModalHeader>
        <ModalBody>
          {this.state.isLoginModal ? <LoginForm /> : null}
        </ModalBody>
        <ModalFooter>
          {this.decideWhichButtonToRender()}
        </ModalFooter>
      </Modal>
    );
  }

  public switchStatus = () => {
    this.setState({isLoginModal: !this.state.isLoginModal});
  }

  public decideWhichButtonToRender = () => {
    let buttonText: string;
    if(this.state.isLoginModal) {
      buttonText = 'Register';
    } else {
      buttonText = 'Login';
    }

    return <Button onClick={this.switchStatus}>{buttonText}</Button>;
  }

  public decideModalHeaderText = () => {
    if(this.state.isLoginModal) {
      return 'Login';
    }

    return 'Register';
  }
}

export default UserRegOrLoginModal;
