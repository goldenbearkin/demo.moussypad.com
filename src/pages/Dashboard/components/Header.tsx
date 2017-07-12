import * as React from 'react';

// UI
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import UserMenu from '../containers/UserMenu';

class Header extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <Toolbar>
        <ToolbarTitle text="Moussypad" />
        <ToolbarGroup>
          <UserMenu />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Header;