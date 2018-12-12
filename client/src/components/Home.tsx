import React from 'react';
import {connect} from 'react-redux';
import {getAllTweetsApi} from '../redux/actions/tweet';
import TweetTemplate from './TweetTemplate';

interface IProps {
  getAllTweetsApi: () => void,
  tweetArray: [{
    _id: string,
    date: Date,
    message: string,
    ownerId: string
  }],
};

export class Home extends React.Component<IProps> {
  public componentDidMount() {
    this.props.getAllTweetsApi();
  };

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

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllTweetsApi: () => dispatch(getAllTweetsApi()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);