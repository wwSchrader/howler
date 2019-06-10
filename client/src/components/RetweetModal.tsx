import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import TweetTemplate from './TweetTemplate';

export interface IProps {
  showRetweetModal: boolean,
  toggleModalState: () => void,
  date: Date,
  username: string,
  retweetId: string,
  tweetMessage: string,
};

export class RetweetModal extends React.Component<IProps> {
  public render() {
    return (
      <Modal isOpen={this.props.showRetweetModal} toggle={this.props.toggleModalState}>
        <ModalHeader toggle={this.props.toggleModalState}>
          Rehowl this to EVERYONE
        </ModalHeader>
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

export default RetweetModal;