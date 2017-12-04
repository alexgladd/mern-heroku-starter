// reducers main
import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import serverState from './serverstate';

const appReducers = combineReducers({
  auth,
  user,
  serverState
});

export default appReducers;
