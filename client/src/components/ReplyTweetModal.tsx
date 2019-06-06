import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import TweetTemplate from './TweetTemplate';

export interface IDispatchFromProps {
  showReplyTweetModal?: boolean,
  toggleModalState: () => void,
  date: Date,
  username: string,
  tweetMessage: string,
};

export class ReplyTweetModal extends React.Component<IDispatchFromProps> {
  public render() {
    return (
      <Modal isOpen={this.props.showReplyTweetModal} toggle={this.props.toggleModalState}>
        <ModalHeader toggle={this.props.toggleModalState}>Reply Tweet Modal</ModalHeader>
        <ModalBody>
          <TweetTemplate
            date={this.props.date}
            tweetMessage={this.props.tweetMessage}
            username={this.props.username}
          />
        </ModalBody>
      </Modal>
    );
  };
};

export default ReplyTweetModal;