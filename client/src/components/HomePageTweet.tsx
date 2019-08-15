import React from 'react';
import chat from '../assets/chat.svg';
import exchange from '../assets/exchange.svg'
import './HomePageTweet.css';
import ReplyTweetModal from './ReplyTweetModal';
import RetweetModal from './RetweetModal';
import TweetTemplate from './TweetTemplate';

export interface IProps {
  date: Date,
  tweetId: string,
  tweetMessage: string,
  username: string,
  retweet?: {
    _id: string,
    date: Date,
    message: string,
    username: string,
  },
};

export interface IState {
  showReplyTweetModal: boolean,
  showRetweetModal: boolean,
};

export class HomePageTweet extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      showReplyTweetModal: false,
      showRetweetModal: false,
    };

    this.toggleReplyModalState = this.toggleReplyModalState.bind(this);
    this.toggleRetweetModalState = this.toggleRetweetModalState.bind(this);
  };

  public render() {
    return (
      <div className='HomePageTweet'>
        <TweetTemplate
          date={this.props.date}
          tweetMessage={this.props.tweetMessage}
          username={this.props.username}
          retweet={this.props.retweet}
        />
        <div>
          <img className='ReplyButton' src={chat} onClick={this.toggleReplyModalState}/>
          <input className='RetweetButton' type='image' src={exchange} onClick={this.toggleRetweetModalState}/>
        </div>
        <ReplyTweetModal
          showReplyTweetModal={this.state.showReplyTweetModal}
          toggleModalState={this.toggleReplyModalState}
          date={this.props.date}
          username={this.props.username}
          tweetMessage={this.props.tweetMessage}
          replyId={this.props.tweetId}
        />
        <RetweetModal
          showRetweetModal={this.state.showRetweetModal}
          toggleModalState={this.toggleRetweetModalState}
          date={this.props.date}
          username={this.props.username}
          tweetMessage={this.props.tweetMessage}
          retweetId={this.props.tweetId}
        />
      </div>
    );
  };

  public toggleReplyModalState() {
    this.setState({
      showReplyTweetModal: !this.state.showReplyTweetModal,
    });
  };

  public toggleRetweetModalState() {
    this.setState({
      showRetweetModal: !this.state.showRetweetModal,
    });
  };
};

export default HomePageTweet;