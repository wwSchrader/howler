import React from 'react';
import ReplyTweetModal from './ReplyTweetModal';

export interface IProps {
  date: Date,
  tweetMessage: string,
  username: string,
}

export interface IState {
  showReplyTweetModal: boolean,
};

export class TweetTemplate extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      showReplyTweetModal: false,
    };

    this.toggleModalState = this.toggleModalState.bind(this);
  };

  public render() {
    return (
      <div>
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
        <div>
          <button onClick={this.toggleModalState}>Reply</button>
          <button>Retweet</button>
          <button>Like</button>
        </div>
        <ReplyTweetModal
          showReplyTweetModal={this.state.showReplyTweetModal}
          toggleModalState={this.toggleModalState}
          date={this.props.date}
          username={this.props.username}
          tweetMessage={this.props.tweetMessage}
          />
      </div>
    );
  };

  public toggleModalState() {
    this.setState({
      showReplyTweetModal: !this.state.showReplyTweetModal,
    });
  };
};

export default TweetTemplate;