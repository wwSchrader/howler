import React from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {addTweetApi} from '../redux/actions/Tweet';
import TweetTemplate from './TweetTemplate';

export interface IProps {
  showRetweetModal: boolean,
  toggleModalState: () => void,
  date: Date,
  username: string,
  retweetId: string,
  tweetMessage: string,
  addTweetApi: (tweet: string, retweetId: string, toggleModal: () => void,) => void,
};

export interface IState {
  tweetInput: string,
};

export class RetweetModal extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      tweetInput: '',
    };

    this.handleOnTweetInputChange = this.handleOnTweetInputChange.bind(this);
    this.onRetweetButtonSubmit = this.onRetweetButtonSubmit.bind(this);
  };

  public handleOnTweetInputChange = (e: any) => {
    this.setState({tweetInput: e.target.value});
  };

  public onRetweetButtonSubmit = (e: any) => {
    e.preventDefault();
    this.props.addTweetApi(this.state.tweetInput, this.props.retweetId, this.props.toggleModalState);
  };

  public render() {
    return (
      <Modal isOpen={this.props.showRetweetModal} toggle={this.props.toggleModalState}>
        <ModalHeader toggle={this.props.toggleModalState}>
          Rehowl this to EVERYONE
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onRetweetButtonSubmit}>
            <FormGroup>
              <Input
                type='textarea'
                id='tweetInput'
                value={this.state.tweetInput}
                onChange={this.handleOnTweetInputChange}
              />
            </FormGroup>
            <TweetTemplate
              date={this.props.date}
              tweetMessage={this.props.tweetMessage}
              username={this.props.username}
            />
            <Button type='submit'>Retweet</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTweetApi: (tweet: string, id: string, toggleModal: () => void) => dispatch(addTweetApi(tweet, null, id, toggleModal)),
  };
};

export default connect(null, mapDispatchToProps)(RetweetModal);