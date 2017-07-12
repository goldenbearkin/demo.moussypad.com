import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

// Redux
import { connect, Dispatch } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history, AuthStateT, AppStateT } from './redux/store';
import {
  authOnRequestInit, AuthOnRequestInitT,
  authOnRequestSignIn, AuthOnRequestSignInT,
  authOnSuccessAction, AuthOnSuccessActionT,
  authOnProgressAction, AuthOnProgressActionT,
  authOnFailureAction, AuthOnFailureActionT,
} from './redux/auth/actions';
import { UserProfileT } from './redux/models/userProfile';

// Rxjs
import 'rxjs/add/operator/mergeMap';

type PropsT = {
  auth: AuthStateT;
  authOnRequestInit: () => AuthOnRequestInitT,
  authOnRequestSignIn: () => AuthOnRequestSignInT,
  authOnProgressAction: () => AuthOnProgressActionT;
  authOnSuccessAction: (userProfile: UserProfileT) => AuthOnSuccessActionT;
  authOnFailureAction: (err: Error) => AuthOnFailureActionT;
};

class App extends React.Component<PropsT, {}> {
  componentDidMount() {
    this.props.authOnRequestInit();
  }

  render() {
    const current = this.props.auth.current;

    if (current === 'onProcess') {
      const style: React.CSSProperties = {
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      };
      return (
        <div style={style}>
          <img style={{ width: '20vmax'}} src="loading.gif" alt="loading" />
        </div>
      );
    }

    return (
      <ConnectedRouter history={history}>
        <div>
          <Route
            exact
            path="/"
            render={() => current === 'onSuccess' ? <Redirect to={{ pathname: '/dashboard' }} /> : <Home />}
          />
          <Route
            path="/dashboard"
            render={() => current === 'onSuccess' ? <Dashboard /> : <Redirect to={{ pathname: '/' }} />}
          />
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state: AppStateT) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  authOnRequestInit: () => dispatch(authOnRequestInit()),
  authOnRequestSignIn: () => dispatch(authOnRequestSignIn()),
  authOnProgressAction: () => dispatch(authOnProgressAction()),
  authOnSuccessAction: (userProfile: UserProfileT) => dispatch(authOnSuccessAction(userProfile)),
  authOnFailureAction: (err: Error) => dispatch(authOnFailureAction(err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
