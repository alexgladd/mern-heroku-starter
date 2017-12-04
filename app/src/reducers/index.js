// reducers main
import { combineReducers } from 'redux';
import user from './user';
import serverState from './serverstate';

const appReducers = combineReducers({
  user,
  serverState
});

export default appReducers;
