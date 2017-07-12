import { ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { AuthActionsT, AuthOnSuccessActionT, AuthOnFailureActionT } from './actions';

import { GoogleAuth2 } from '../../services/google/googleAuth2';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

const config = {
  apiKey: 'AIzaSyBjvY5R6s796cDFLOGygQ9pmVIclqGkhZw',
  discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
  clientId: '172273720339-ojr1afhroua2d9vmg2a75pvd1663lho0.apps.googleusercontent.com',
  scope: 'profile'
};

const googleAuth2 = new GoogleAuth2(config);

const authInitEpic = (action$: ActionsObservable<AuthActionsT>) =>
  action$
    .ofType('AUTH_ON_REQUEST_INIT')
    .switchMap(() => googleAuth2.init$()
      .map(userProfile => {
        const success: AuthOnSuccessActionT = { type: 'AUTH_ON_SUCCESS', userProfile };
        return success;
      })
      .catch(error => {
        const failure: AuthOnFailureActionT = { type: 'AUTH_ON_FAILURE', error };
        return Observable.of(failure);
      })
    );

const authSignInEpic = (action$: ActionsObservable<AuthActionsT>) =>
  action$
    .ofType('AUTH_ON_REQUEST_SIGNIN')
    .switchMap(() => googleAuth2.signIn$()
      .map(userProfile => {
        const success: AuthOnSuccessActionT = { type: 'AUTH_ON_SUCCESS', userProfile };
        return success;
      })
      .catch(error => {
        const failure: AuthOnFailureActionT = { type: 'AUTH_ON_FAILURE', error };
        return Observable.of(failure);
      })
    );

const authSignOutEpic = (action$: ActionsObservable<AuthActionsT>) =>
  action$
    .ofType('AUTH_ON_REQUEST_SIGNOUT')
    .switchMap(() => googleAuth2.signOut$()
      .map(() => {
        const failure: AuthOnFailureActionT = { type: 'AUTH_ON_FAILURE', error: new Error('login failed') };
        return failure;
      })
      .catch(error => {
        const failure: AuthOnFailureActionT = { type: 'AUTH_ON_FAILURE', error };
        return Observable.of(failure);
      })
    );

export const authEpics = combineEpics(
  authInitEpic,
  authSignInEpic,
  authSignOutEpic
);