import React from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader} from 'reactstrap';
import TweetTemplate from './TweetTemplate';

export interface IProps {
  showRetweetModal: boolean,
  toggleModalState: () => void,
  date: Date,
  username: string,
  retweetId: string,
  tweetMessage: string,
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
  };

  public handleOnTweetInputChange = (e: any) => {
    this.setState({tweetInput: e.target.value});
  };

  public onRetweetButtonSubmit = (e: any) => {
    e.preventDefault();
  };

  public render() {
    return (
      <Modal isOpen={this.props.showRetweetModal} toggle={this.props.toggleModalState}>
        <ModalHeader toggle={this.props.toggleModalState}>
          Rehowl this to EVERYONE
        </ModalHeader>
        <ModalBody>
          <Form>
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

export default RetweetModal;