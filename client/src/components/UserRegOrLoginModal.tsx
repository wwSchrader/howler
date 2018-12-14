import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import {setShowUserRegOrLoginModal} from '../redux/actions/User';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export interface IDispatchFromProps {
  setShowUserRegOrLoginModal: (bool: boolean) => void,
  showUserRegOrLoginModal: boolean,
};

export interface IStateFromProps {
  isLoginModal: boolean,
};

export class UserRegOrLoginModal extends React.Component<IDispatchFromProps, IStateFromProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoginModal: true,
    };

    this.switchStatus = this.switchStatus.bind(this);
    this.decideWhichButtonToRender = this.decideWhichButtonToRender.bind(this);
    this.decideModalHeaderText = this.decideModalHeaderText.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  public render() {
    return (
      <Modal isOpen={this.props.showUserRegOrLoginModal}>
        <ModalHeader toggle={this.toggleModal}>{this.decideModalHeaderText()}</ModalHeader>
        <ModalBody>
          {this.state.isLoginModal ? <LoginForm /> : <RegistrationForm />}
        </ModalBody>
        <ModalFooter>
          {this.decideWhichButtonToRender()}
        </ModalFooter>
      </Modal>
    );
  }

  public toggleModal = () => {
    this.props.setShowUserRegOrLoginModal(!this.props.showUserRegOrLoginModal);
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

const mapStateToProps = (state: any) => {
  return {
    showUserRegOrLoginModal: state.setShowingUserRegOrLogin,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setShowUserRegOrLoginModal: (bool: boolean) => dispatch(setShowUserRegOrLoginModal(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegOrLoginModal);
