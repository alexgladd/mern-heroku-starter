// reducers main
import { combineReducers } from 'redux';
import auth from './auth';

const appReducers = combineReducers({
  auth
});

export default appReducers;
