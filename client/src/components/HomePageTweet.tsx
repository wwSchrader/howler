import React from 'react';
import ReplyTweetModal from './ReplyTweetModal';
import TweetTemplate from './TweetTemplate';

export interface IProps {
  date: Date,
  tweetMessage: string,
  username: string,
};

export interface IState {
  showReplyTweetModal: boolean,
};

export class HomePageTweet extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      showReplyTweetModal: false,
    };

    this.toggleModalState = this.toggleModalState.bind(this);
  };

  public render() {
    return (
      <div className='HomePageTweet'>
        <TweetTemplate
          date={this.props.date}
          tweetMessage={this.props.tweetMessage}
          username={this.props.username}
        />
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

export default HomePageTweet;