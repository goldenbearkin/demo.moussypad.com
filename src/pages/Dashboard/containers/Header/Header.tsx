import * as React from 'react';
import AppBar from 'material-ui/AppBar';

// UI
import UserMenu from '../UserMenu/UserMenu';

const styles: { appbar: React.CSSProperties } = {
  appbar: {
    position: 'fixed', 
    top: 0,
    backgroundColor: 'white'
  }
};

class Header extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div>
        <AppBar 
          style={styles.appbar}
          title="Moussypad"
          titleStyle={{ color: 'rgba(0,0,0,.54)' }}
          iconElementLeft={<div />}
          iconElementRight={<UserMenu />}
        />
      </div>
      
    );
  }
}

export default Header;