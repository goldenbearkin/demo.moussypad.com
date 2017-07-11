import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

import { history, AuthStateT, AppStateT } from './redux/store';
import {
  authOnSuccessAction, AuthOnSuccessActionT,
  authOnProgressAction, AuthOnProgressActionT,
  authOnFailureAction, AuthOnFailureActionT
} from './redux/auth/actions';
import { UserProfileT } from './redux/models/userProfile';

import { GoogleApiAuth2 } from './services/google/googleApiAuth2';

const auth2 = new GoogleApiAuth2();

type PropsT = {
  auth: AuthStateT;
  authOnProgressAction: () => AuthOnProgressActionT;
  authOnSuccessAction: (userProfile: UserProfileT) => AuthOnSuccessActionT;
  authOnFailureAction: (err: Error) => AuthOnFailureActionT;
};

class App extends React.Component<PropsT, {}> {
  componentDidMount() {
    auth2.isInitAuthenticated$()
      .then(isAuth => {
        if (isAuth) {
          const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
          this.props.authOnSuccessAction({
            username: profile.getName(),
            imageURL: profile.getImageUrl()
          });
        } else {
          this.props.authOnFailureAction(new Error('User does not login to Google'));
        }

        gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
          if (isSignedIn) {
            const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
            this.props.authOnSuccessAction({
              username: profile.getName(),
              imageURL: profile.getImageUrl()
            });
          } else {
            this.props.authOnFailureAction(new Error('User does not login to Google'));
          }
        });
      })
      .catch(e => this.props.authOnFailureAction(e));
  }

  render() {
    const current = this.props.auth.current;

    if (current === 'onProcess') {
      return <h1>Loading...</h1>;
    }

    return (
      <ConnectedRouter history={history}>
        <div>
          <Route 
            exact 
            path="/" 
            render={() => current === 'onSuccess' ? <Redirect to={{ pathname: '/dashboard'}} /> : <Home />} 
          />
          <Route 
            path="/dashboard" 
            render={() => current === 'onSuccess' ? <Dashboard /> : <Redirect to={{ pathname: '/'}} />} 
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
  authOnProgressAction: () => dispatch(authOnProgressAction()),
  authOnSuccessAction: (userProfile: UserProfileT) => dispatch(authOnSuccessAction(userProfile)),
  authOnFailureAction: (err: Error) => dispatch(authOnFailureAction(err))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
