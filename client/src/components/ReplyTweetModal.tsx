import React from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {addTweetApi} from '../redux/actions/Tweet';
import TweetTemplate from './TweetTemplate';

export interface IDispatchFromProps {
  showReplyTweetModal?: boolean,
  toggleModalState: () => void,
  date: Date,
  username: string,
  replyId: string,
  tweetMessage: string,
  addTweetApi: (tweet: string, replyId: string) => void,
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

    this.handleOnTweetInputChange = this.handleOnTweetInputChange.bind(this);
    this.onReplyButtonSubmit = this.onReplyButtonSubmit.bind(this);
  };

  public handleOnTweetInputChange = (e: any) => {
    this.setState({tweetInput: e.target.value});
  };

  public onReplyButtonSubmit = (e: any) => {
    e.preventDefault();
    this.props.addTweetApi(this.state.tweetInput, this.props.replyId);
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
          <Form onSubmit={this.onReplyButtonSubmit}>
            <FormGroup>
              <Input
                type='textarea'
                id='tweetInput'
                value={this.state.tweetInput}
                onChange={this.handleOnTweetInputChange}
              />
            </FormGroup>
            <Button type='submit'>Reply</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  };
};

const mapDispactchToProps = (dispactch: any) => {
  return {
    addTweetApi: (tweet: string, id: string) => dispactch(addTweetApi(tweet, id)),
  };
};

export default connect(null, mapDispactchToProps)(ReplyTweetModal);