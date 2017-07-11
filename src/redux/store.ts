import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { ApolloClient } from 'react-apollo';

// // import userProfileReducer, { UserProfileT } from './redux/reducers/userProfile';
// // export {UserProfileT};
import { authReducer, AuthStateT } from './auth/reducer';
export { AuthStateT };

export type AppStateT = {
  auth: AuthStateT
  // apollo: Store
  // apollo: client.reducer(),
};

// Epics
// import { combineEpics, createEpicMiddleware } from 'redux-observable';
// import { authSignInEpic } from './auth/epics';

// const rootEpic = combineEpics(
//   authSignInEpic
// );
// const epicMiddleware = createEpicMiddleware(rootEpic);

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();
const routeMiddleware = routerMiddleware(history);

// Build the middleware for intercepting and dispatching navigation actions
// const route_middleware = routerMiddleware(history);

export const client = new ApolloClient;
export const store = createStore(
  combineReducers({
    auth: authReducer,
    router: routerReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware(), routeMiddleware),
    // If you are using the devToolsExtension, you can add it here also
    // (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);