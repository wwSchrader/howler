import React from 'react';
import {Modal} from 'reactstrap';

export interface IProps {
  showReplyTweetModal: boolean,
};

export class ReplyTweetModal extends React.Component<IProps> {
  public render() {
    return (
      <Modal isOpen={this.props.showReplyTweetModal}>
        'Reply Tweet Modal'
      </Modal>
    );
  };
};

export default ReplyTweetModal;