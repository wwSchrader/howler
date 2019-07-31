import React from 'react';
import {connect} from 'react-redux';
import {setTweetArray} from 'src/redux/actions/Tweet';
import {checkSession} from '../redux/actions/User';
import {subscribeToAddTweet} from '../socket';
import AddTweetModal from './AddTweetModal';
import Home from './Home';
import NavigationBar from './NavigationBar';
import UserRegOrLoginModal from './UserRegOrLoginModal';

interface IProps {
  addTweetToArray: (newArray: any) => void,
  checkSession: () => void,
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

export class App extends React.Component<IProps> {
  constructor(props: any) {
    super(props);

    this.addTweetToArrayLogic = this.addTweetToArrayLogic.bind(this);
  }
  public componentDidMount() {
    this.props.checkSession();
    subscribeToAddTweet(this.addTweetToArrayLogic);
  };

  public addTweetToArrayLogic(newTweet: any) {
        // add the new tweet to the front of the array to display
        const newArray = this.props.tweetArray.slice();
        newArray.unshift(newTweet);
        this.props.addTweetToArray(newArray);
  }

  public render() {
    return (
      <div>
        <NavigationBar />
        <UserRegOrLoginModal />
        <AddTweetModal />
        <Home />
      </div>
    );
  };
};

const mapStateToProps = (state: any) => {
  // tslint:disable-next-line: no-console
  console.log(state);
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
