import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from '../redux/store/configureStore';
import { AppContainer } from 'react-hot-loader';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
console.log(store);
console.log(history);
ReactDOM.render(
  (<AppContainer>
    <Root store={store} history={history} />
  </AppContainer>), document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Root.js', () => {
    const NextRootContainer = require('./containers/Root.js').default;

    ReactDOM.render((
      <AppContainer>
        <NextRootContainer store={store} history={history} />
      </AppContainer>
    ), document.getElementById('app'));
  });
}
