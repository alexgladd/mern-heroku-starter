import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { requestServerState } from './actions/serverstate';
import { loginUser } from './actions/user';

import localstore from './util/localstore';

const middleware = [ thunk ];
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

const localUser = localstore.getUserInfo();
if (localUser) {
  store.dispatch(loginUser(localUser));
}

store.dispatch(requestServerState());

const reduxApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(reduxApp, document.getElementById('root'));
registerServiceWorker();
