import { Action } from 'redux';
import { UserProfileT } from '../models/userProfile';

export interface AuthOnRequestSignInT extends Action {
  type: 'AUTH_ON_REQUEST_SIGNIN';
}

export interface AuthOnRequestSignOutT extends Action {
  type: 'AUTH_ON_REQUEST_SIGNOUT';
}

export interface AuthOnProgressActionT extends Action {
  type: 'AUTH_ON_PROGRESS';
}

export interface AuthOnSuccessActionT extends Action {
  type: 'AUTH_ON_SUCCESS';
  userProfile: UserProfileT;
}

export interface AuthOnFailureActionT extends Action {
  type: 'AUTH_ON_FAILURE';
  error: Error;
}

export function authOnRequestSignIn(): AuthOnRequestSignInT {
  return { type: 'AUTH_ON_REQUEST_SIGNIN' };
}

export function authOnRequestSignOut(): AuthOnRequestSignOutT {
  return { type: 'AUTH_ON_REQUEST_SIGNOUT' };
}

export function authOnProgressAction(): AuthOnProgressActionT {
  return { type: 'AUTH_ON_PROGRESS' };
}

export function authOnSuccessAction(userProfile: UserProfileT): AuthOnSuccessActionT {
  return { type: 'AUTH_ON_SUCCESS', userProfile };
}

export function authOnFailureAction(error: Error): AuthOnFailureActionT {
  return { type: 'AUTH_ON_FAILURE', error };
}
 
export type AuthActionsT
  = AuthOnRequestSignInT
  | AuthOnRequestSignOutT
  | AuthOnProgressActionT
  | AuthOnSuccessActionT
  | AuthOnFailureActionT;