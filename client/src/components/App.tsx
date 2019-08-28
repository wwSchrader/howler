import {css} from '@emotion/core';
import React from 'react';
import {connect} from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import {setTweetArray} from '../redux/actions/Tweet';
import {checkSession} from '../redux/actions/User';
import {subscribeToAddTweet, unSubscribeAddTweet} from '../socket';
import AddTweetModal from './AddTweetModal';
import Home from './Home';
import NavigationBar from './NavigationBar';
import UserRegOrLoginModal from './UserRegOrLoginModal';

interface IProps {
  addTweetToArray: (newArray: any) => void,
  checkSession: () => Promise<boolean>,
  tweetArray: [{
    _id: string,
    date: Date,
    message: string,
    username: string,
    retweet?: {
      _id: string,
      date: Date,
      message: string,
      username: string,
    },
  }],
};

interface IState {
  loader: boolean,
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loader: true,
    };

    this.addTweetToArrayLogic = this.addTweetToArrayLogic.bind(this);
    this.determineShowLoadSpinner = this.determineShowLoadSpinner.bind(this);
  }

  public componentDidMount() {
    this.props.checkSession()
    .then((result: boolean) => {
      // when check session is done, disable load spinner;
      this.setState({loader: false});
    });
    subscribeToAddTweet(this.addTweetToArrayLogic);
  };

  public componentWillUnmount() {
    unSubscribeAddTweet();
  };

  public addTweetToArrayLogic(newTweet: any) {
        // add the new tweet to the front of the array to display
        const newArray = this.props.tweetArray.slice();
        newArray.unshift(newTweet);
        this.props.addTweetToArray(newArray);
  }

  public determineShowLoadSpinner() {
    if (this.state.loader) {
      return (
        <div>
          <h2>Please wait for the Heroku server to spin up...</h2>
          <h3>This can take up to 20 seconds.</h3>
          <HashLoader css={override} sizeUnit={'px'} size={150} color={'red'} loading={true}/>
        </div>
      );
    } else {
      return null;
    };
  };

  public render() {
    return (
      <div>
        <NavigationBar />
        <UserRegOrLoginModal />
        <AddTweetModal />
        {this.determineShowLoadSpinner()}
        <Home />
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
    addTweetToArray: (tweetArray: any) => dispatch(setTweetArray(tweetArray)),
    checkSession: () => dispatch(checkSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
