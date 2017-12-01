import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';

const middleware = [ thunk ];
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

const reduxApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(reduxApp, document.getElementById('root'));
registerServiceWorker();
