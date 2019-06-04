import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

export interface IDispatchFromProps {
  showReplyTweetModal?: boolean,
  toggleModalState: () => void,
};

export class ReplyTweetModal extends React.Component<IDispatchFromProps> {
  public render() {
    return (
      <Modal isOpen={this.props.showReplyTweetModal} toggle={this.props.toggleModalState}>
        <ModalHeader toggle={this.props.toggleModalState}>Reply Tweet Modal</ModalHeader>
        <ModalBody>
          'Reply Tweet Modal'
        </ModalBody>
      </Modal>
    );
  };
};

export default ReplyTweetModal;