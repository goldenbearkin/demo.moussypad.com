import * as React from 'react';
import './Home.css';

// Redux
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { authOnRequestSignIn, AuthOnRequestSignInT } from  '../../redux/auth/actions';

const logo = require('./logo.svg');
const googleSignInButton = require('./googleSignInButton.png');

type PropsT = {
  authOnRequestSignIn: () => AuthOnRequestSignInT
};

class Home extends React.Component<PropsT> {
  constructor(props: PropsT) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <img onClick={this.handleClick} src={googleSignInButton} alt="sign-in-button" />
      </div>
    );
  }
  handleClick() {
    gapi.auth2.getAuthInstance().signIn();
    // this.props.authOnRequestSignIn();
  }
}

// const mapStateToProps = (state: AppStateT) => ({});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  authOnRequestSignIn: () => dispatch(authOnRequestSignIn())
});

export default connect(null, mapDispatchToProps)(Home);