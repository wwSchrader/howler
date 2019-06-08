import React from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader} from 'reactstrap';
import TweetTemplate from './TweetTemplate';

export interface IDispatchFromProps {
  showReplyTweetModal?: boolean,
  toggleModalState: () => void,
  date: Date,
  username: string,
  tweetMessage: string,
};

export interface IState {
  tweetInput: string,
};

export class ReplyTweetModal extends React.Component<IDispatchFromProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      tweetInput: '',
    };
  };

  public handleOnTweetInputChange = (e: any) => {
    this.setState({tweetInput: e.target.value});
  };

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
          <Form>
            <FormGroup>
              <Input
                type='textarea'
                id='tweetInput'
                value={this.state.tweetInput}
                onChange={this.handleOnTweetInputChange}
              />
            </FormGroup>
            <Button>Reply</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  };
};

export default ReplyTweetModal;