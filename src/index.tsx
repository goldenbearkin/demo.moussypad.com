import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { MuiThemeProvider } from 'material-ui/styles';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import { ApolloProvider } from 'react-apollo';
import { client, store } from './redux/store';

const RootRender = () => (
  <ApolloProvider store={store} client={client}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(
  <RootRender />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();