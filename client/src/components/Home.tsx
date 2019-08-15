import React from 'react';
import {connect} from 'react-redux';
import {Col, Container} from 'reactstrap';
import {getAllTweetsApi} from '../redux/actions/Tweet';
import './Home.css';
import HomePageTweet from './HomePageTweet';

interface IProps {
  getAllTweetsApi: () => void,
  navigationState: string,
  tweetArray: [{
    _id: string,
    date: Date,
    message: string,
    ownerId: string,
    username: string,
    retweet?: {
      _id: string,
      date: Date,
      message: string,
      username: string,
    },
  }],
  username: {
    _id: string,
  },
};

export class Home extends React.Component<IProps> {
  public componentDidMount() {
    this.props.getAllTweetsApi();
  };

  public render() {
    return (
      <Container fluid={true}>
        <Col sm={{size: 12}} md={{size: 6, offset: 3}}>
          {this.props.tweetArray.map((tweet) => {
            // filters out other tweets if User navigation state is active
            if (this.props.navigationState === 'User' && this.props.username._id !== tweet.ownerId) {
              return null;
            };
            return (
              <div className='tweet-container' key={tweet._id + 'span'}>
                <HomePageTweet
                  key={tweet._id}
                  tweetId={tweet._id}
                  date={tweet.date}
                  tweetMessage={tweet.message}
                  username={tweet.username}
                  retweet={tweet.retweet}
                />
              </ div>
            );
          })}
        </Col>
      </Container>
    );
  };
};

const mapStateToProps = (state: any) => {
  return {
    navigationState: state.setNavigationMode,
    tweetArray: state.setTweetArray,
    username: state.setUsername,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllTweetsApi: () => dispatch(getAllTweetsApi()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);