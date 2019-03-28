import React from 'react';
import {connect} from 'react-redux';
import {Col, Container} from 'reactstrap';
import {getAllTweetsApi} from '../redux/actions/Tweet';
import './Home.css';
import TweetTemplate from './TweetTemplate';

interface IProps {
  getAllTweetsApi: () => void,
  tweetArray: [{
    _id: string,
    date: Date,
    message: string,
    username: string
  }],
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
            return (
              <div className='tweet-container' key={tweet._id + 'span'}>
                <TweetTemplate
                  key={tweet._id}
                  date={tweet.date}
                  tweetMessage={tweet.message}
                  username={tweet.username}
                />
              </ div>
            )
          })}
        </Col>
      </Container>
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