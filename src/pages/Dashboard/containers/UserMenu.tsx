import * as React from 'react';

// Redux
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { authOnRequestSignOut, AuthOnRequestSignOutT } from '../../../redux/auth/actions';
import { AppStateT, AuthStateT } from '../../../redux/store';

// UI
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

type PropsT = { 
  auth: AuthStateT,
  authOnRequestSignOut: () => AuthOnRequestSignOutT
};

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
    this.props.authOnRequestSignOut();
  }
}

const mapStateToProps = (state: AppStateT) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  authOnRequestSignOut: () => dispatch(authOnRequestSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);