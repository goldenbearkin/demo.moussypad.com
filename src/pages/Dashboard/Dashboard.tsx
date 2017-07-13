import * as React from 'react';

// UI
import Header from './containers/Header/Header';
import PresentationGallery from './containers/PresentationGallery/PresentationGallery';

const styles = {
  gallery: {
    paddingTop: 80,
    paddingLeft: '10vw',
    paddingRight: '10vw'
  }
};

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PresentationGallery style={styles.gallery}/>
      </div>
    );
  }
  handleClick() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
  }
}

export default Dashboard;