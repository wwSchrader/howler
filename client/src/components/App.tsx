import * as React from 'react';
import NavigationBar from './NavigationBar';
import UserRegOrLoginModal from './UserRegOrLoginModal';

class App extends React.Component {
  public render() {
    return (
      <div>
        <NavigationBar />
        <UserRegOrLoginModal />
      </div>
    );
  };
};

export default App;
