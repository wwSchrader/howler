import * as React from 'react';
import AddTweetModal from './AddTweetModal';
import Home from './Home';
import NavigationBar from './NavigationBar';
import UserRegOrLoginModal from './UserRegOrLoginModal';

class App extends React.Component {
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

export default App;
