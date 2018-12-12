import React from 'react';
import {connect} from 'react-redux';
import TweetTemplate from './TweetTemplate';

interface IProps {
  tweetArray: [{
    _id: string,
    date: Date,
    message: string,
    ownerId: string
  }],
};

export class Home extends React.Component<IProps> {
  public render() {
    return (
      <div>
        {this.props.tweetArray.map((tweet) => {
          return (
            <TweetTemplate
                key={tweet._id}
                date={tweet.date}
                tweetMessage={tweet.message}
                username={tweet.ownerId}
            />
          )
        })}
      </div>
    );
  };
};

const mapStateToProps = (state: any) => {
  return {
    tweetArray: state.setTweetArray,
  };
};

export default connect(mapStateToProps, null)(Home);