import React from 'react';
import RetweetTemplate from './RetweetTemplate';

export interface IProps {
  date: Date,
  tweetMessage: string,
  username: string,
  retweet?: {
    _id: string,
    date: Date,
    message: string,
    username: string,
  },
}

export class TweetTemplate extends React.Component<IProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      showReplyTweetModal: false,
    };

    this.showRetweet = this.showRetweet.bind(this);
  };

  public showRetweet() {
    if (this.props.retweet) {
      return (
        <RetweetTemplate
          date={this.props.retweet.date}
          message={this.props.retweet.message}
          username={this.props.retweet.username}
        />
      );
    }

    return null;
  }

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
          {this.showRetweet()}
        </div>
      </div>
    );
  };
};

export default TweetTemplate;