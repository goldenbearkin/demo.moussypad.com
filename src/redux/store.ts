// Epics
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { authEpics } from './auth/epics';

const rootEpic = combineEpics(
  authEpics
);
const epicMiddleware = createEpicMiddleware(rootEpic);

// Router
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();
const routeMiddleware = routerMiddleware(history);

// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ApolloClient } from 'react-apollo';
import { authReducer, AuthStateT } from './auth/reducer';
export { AuthStateT };

export type AppStateT = {
  auth: AuthStateT
  // apollo: ApolloStore
};

export const client = new ApolloClient;
export const store = createStore(
  combineReducers({
    auth: authReducer,
    router: routerReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware(), routeMiddleware, epicMiddleware),
    // If you are using the devToolsExtension, you can add it here also
    // (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);