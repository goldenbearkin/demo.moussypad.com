import * as React from 'react';

// Redux
import { connect } from 'react-redux';
import { AppStateT, AuthStateT } from '../../../redux/store';

// UI
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

type PropsT = { auth: AuthStateT };

type StateT = {
  open: boolean;
  anchorEl?: React.ReactInstance;
};

class UserMenu extends React.Component<PropsT, StateT> {
  constructor(props: PropsT) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      open: false,
    };
  }

  render() {
    const userImageURI = this.props.auth.current === 'onSuccess' ? this.props.auth.userProfile.imageURL : '';
    return (
      <div>
        <div onClick={this.handleClick}>
          <Avatar src={userImageURI} />
        </ div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem onTouchTap={this.handleTouchTap} primaryText="Sign out" />
          </Menu>
        </Popover>
      </div>
    );
  }

  private handleClick(e: React.MouseEvent<HTMLDivElement>) {
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
  }

  private handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  private handleTouchTap() {
    gapi.auth2.getAuthInstance().signOut();
  }
}

const mapStateToProps = (state: AppStateT) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(UserMenu);