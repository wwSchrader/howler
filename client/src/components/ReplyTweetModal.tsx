import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

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
          <div className='TweetHeader'>
            <span>
              <b>{this.props.username}</b>
              <p>{new Date(this.props.date).toDateString()}</p>
            </span>
          </div>
          <div className='TweetBody'>
            <span>
              <p>{this.props.tweetMessage}</p>
            </span>
          </div>
        </ModalBody>
      </Modal>
    );
  };
};

export default ReplyTweetModal;