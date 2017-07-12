import * as React from 'react';
import Header from './components/Header';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
  handleClick() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
  }
}

export default Dashboard;