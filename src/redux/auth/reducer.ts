import { AuthActionsT } from './actions';
import { UserProfileT } from '../models/userProfile';

type OnProcessT = {
  current: 'onProcess'
};

type OnSuccessT = {
  current: 'onSuccess',
  userProfile: UserProfileT
};

type OnFailureT = {
  current: 'onFailure',
  error: Error;
};

export type AuthStateT = OnProcessT | OnSuccessT | OnFailureT;

export function authReducer(state: AuthStateT = { current: 'onProcess' }, action: AuthActionsT) {
  switch (action.type) {
    case 'AUTH_ON_REQUEST_INIT':
    case 'AUTH_ON_REQUEST_SIGNIN':
    case 'AUTH_ON_PROCESS':
      return {
        current: 'onProcess'
      };
    case 'AUTH_ON_SUCCESS':
      return {
        current: 'onSuccess',
        userProfile: action.userProfile
      };
    case 'AUTH_ON_FAILURE':
      return {
        current: 'onFailure',
        error: action.error
      };
    default:
      return state;
  }
}