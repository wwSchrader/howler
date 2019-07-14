import React from 'react';
import {connect} from 'react-redux';
import {checkSession} from '../redux/actions/User';
import AddTweetModal from './AddTweetModal';
import Home from './Home';
import NavigationBar from './NavigationBar';
import UserRegOrLoginModal from './UserRegOrLoginModal';

interface IProps {
  checkSession: () => void,
};

export class App extends React.Component<IProps> {
  public componentDidMount() {
    this.props.checkSession();
  };

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

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkSession: () => dispatch(checkSession()),
  };
};

export default connect(null, mapDispatchToProps)(App);
