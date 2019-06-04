import React from 'react';
import {Modal, ModalBody} from 'reactstrap';

export interface IDispatchFromProps {
  showReplyTweetModal?: boolean,
};

export class ReplyTweetModal extends React.Component<IDispatchFromProps> {
  public render() {
    return (
      <Modal isOpen={this.props.showReplyTweetModal}>
        <ModalBody>
          'Reply Tweet Modal'
        </ModalBody>
      </Modal>
    );
  };
};

export default ReplyTweetModal;