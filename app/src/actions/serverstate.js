// server state actions

import api from '../util/api';

export const ServerStateActions = {
  setState: 'SET_SERVER_STATE'
};

export const setServerState = (serverState) => ({
  type: ServerStateActions.setState,
  serverState
});

export const requestServerState = () => {
  return async (dispatch) => {
    api.getServerState().then(state => {
      dispatch(setServerState(state));
    }).catch(err => {
      console.error('Request server state failure', err);
    });
  };
}
