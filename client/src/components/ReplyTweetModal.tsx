import React from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {addTweetApi, getReplyTweetsApi, setReplyTweetArray} from '../redux/actions/Tweet';
import TweetTemplate from './TweetTemplate';

export interface IDispatchFromProps {
  showReplyTweetModal?: boolean,
  toggleModalState: () => void,
  date: Date,
  username: string,
  replyId: string,
  tweetMessage: string,
  addTweetApi: (tweet: string, replyId: string, toggleModal: () => void,) => void,
  getReplyTweetsApi: (id: string) => void,
  replyArray: any,
  clearReplyTweets: () => void,
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

  public componentDidUpdate(prevProps: any) {
    if (this.props.showReplyTweetModal !== prevProps.showReplyTweetModal) {
      if (this.props.showReplyTweetModal) {
        this.props.getReplyTweetsApi(this.props.replyId);
      } else {
        this.props.clearReplyTweets();
      };
    };
  };

  public handleOnTweetInputChange = (e: any) => {
    this.setState({tweetInput: e.target.value});
  };

  public onReplyButtonSubmit = (e: any) => {
    e.preventDefault();
    this.props.addTweetApi(this.state.tweetInput, this.props.replyId, this.props.toggleModalState);
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
          {this.props.replyArray.map((replyTweet: any) => {
            return (<TweetTemplate
              key={replyTweet._id}
              date={replyTweet.date}
              tweetMessage={replyTweet.message}
              username={replyTweet.username}
            />);
          })}
        </ModalBody>
      </Modal>
    );
  };
};

const mapStateToProps = (state: any) => {
  return {
    replyArray: state.setReplyTweetArray,
  };
};

const mapDispactchToProps = (dispactch: any) => {
  return {
    addTweetApi: (tweet: string, id: string, toggleModal: () => void) => dispactch(addTweetApi(tweet, id, null, toggleModal)),
    clearReplyTweets: () => dispactch(setReplyTweetArray([])),
    getReplyTweetsApi: (id: string) => dispactch(getReplyTweetsApi(id)),
  };
};

export default connect(mapStateToProps, mapDispactchToProps)(ReplyTweetModal);