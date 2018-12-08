import React from 'react';
import {connect} from 'react-redux';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {setShowAddTweetModal} from '../redux/actions/tweet';
import AddTweetForm from './AddTweetForm';

export interface IDispatchFromProps {
  setShowAddTweetModal: (bool: boolean) => void,
  showAddTweetModal: boolean,
};

export class AddTweetModal extends React.Component<IDispatchFromProps> {
  constructor(props: any) {
    super(props);

    this.toogleModal = this.toogleModal.bind(this);
  };

  public toogleModal() {
    this.props.setShowAddTweetModal(false);
  };
  
  public render() {
    return (
      <Modal isOpen={this.props.showAddTweetModal}>
        <ModalHeader toggle={this.toogleModal}>
          Howl your thoughts
        </ModalHeader>
        <ModalBody>
          <AddTweetForm />
        </ModalBody>
      </Modal>
    );
  };
};

const mapStateToProps = (state: any) => {
  return {
    showAddTweetModal: state.showAddTweetModal,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setShowAddTweetModal: (bool: boolean) => dispatch(setShowAddTweetModal(bool)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTweetModal);