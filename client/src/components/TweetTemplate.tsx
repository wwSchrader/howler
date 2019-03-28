import React from 'react';

export interface IProps {
  date: Date,
  tweetMessage: string,
  username: string,
}

export class TweetTemplate extends React.Component<IProps> {
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
          <button>Reply</button>
          <button>Retweet</button>
          <button>Like</button>
        </div>
      </div>
    );
  };
};

export default TweetTemplate;