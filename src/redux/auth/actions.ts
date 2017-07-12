import { Action } from 'redux';
import { UserProfileT } from '../models/userProfile';

export interface AuthOnRequestInitT extends Action {
  type: 'AUTH_ON_REQUEST_INIT';
}

export interface AuthOnRequestSignInT extends Action {
  type: 'AUTH_ON_REQUEST_SIGNIN';
}

export interface AuthOnRequestSignOutT extends Action {
  type: 'AUTH_ON_REQUEST_SIGNOUT';
}

export interface AuthOnProgressActionT extends Action {
  type: 'AUTH_ON_PROCESS';
}

export interface AuthOnSuccessActionT extends Action {
  type: 'AUTH_ON_SUCCESS';
  userProfile: UserProfileT;
}

export interface AuthOnFailureActionT extends Action {
  type: 'AUTH_ON_FAILURE';
  error: Error;
}

export function authOnRequestInit(): AuthOnRequestInitT {
  return { type: 'AUTH_ON_REQUEST_INIT' };
}

export function authOnRequestSignIn(): AuthOnRequestSignInT {
  return { type: 'AUTH_ON_REQUEST_SIGNIN' };
}

export function authOnRequestSignOut(): AuthOnRequestSignOutT {
  return { type: 'AUTH_ON_REQUEST_SIGNOUT' };
}

export function authOnProgressAction(): AuthOnProgressActionT {
  return { type: 'AUTH_ON_PROCESS' };
}

export function authOnSuccessAction(userProfile: UserProfileT): AuthOnSuccessActionT {
  return { type: 'AUTH_ON_SUCCESS', userProfile };
}

export function authOnFailureAction(error: Error): AuthOnFailureActionT {
  return { type: 'AUTH_ON_FAILURE', error };
}
 
export type AuthActionsT
  = AuthOnRequestInitT 
  | AuthOnRequestSignInT
  | AuthOnRequestSignOutT
  | AuthOnProgressActionT
  | AuthOnSuccessActionT
  | AuthOnFailureActionT;