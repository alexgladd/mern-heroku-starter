import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
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

// setup redux
const middleware = [ thunk ];
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

// handle cached user data
const localUser = localstore.getUserInfo();
if (localUser) {
  store.dispatch(loginUser(localUser));
}

// get current server state
store.dispatch(requestServerState());

// wrap app in redux state and react router
const reduxApp = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(reduxApp, document.getElementById('root'));
registerServiceWorker();
