// reducers main
import { combineReducers } from 'redux';
import auth from './auth';
import serverState from './serverstate';

const appReducers = combineReducers({
  auth,
  serverState
});

export default appReducers;
