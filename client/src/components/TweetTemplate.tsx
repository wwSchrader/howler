import React from 'react';

export interface IProps {
  date: Date,
  tweetMessage: string,
  username: string,
}

export class TweetTemplate extends React.Component<IProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      showReplyTweetModal: false,
    };
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
      </div>
    );
  };
};

export default TweetTemplate;