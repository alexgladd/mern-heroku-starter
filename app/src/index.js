import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { requestServerState } from './actions/serverstate';

const middleware = [ thunk ];
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

store.dispatch(requestServerState());

const reduxApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(reduxApp, document.getElementById('root'));
registerServiceWorker();
