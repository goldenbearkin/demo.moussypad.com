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
          <h2>Welcome to Moussypad</h2>
        </div>
        <img style={{ padding: 50 }} onClick={this.handleClick} src={googleSignInButton} alt="sign-in-button" />
      </div>
    );
  }
  handleClick() {
    this.props.authOnRequestSignIn();
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  authOnRequestSignIn: () => dispatch(authOnRequestSignIn())
});

export default connect(null, mapDispatchToProps)(Home);