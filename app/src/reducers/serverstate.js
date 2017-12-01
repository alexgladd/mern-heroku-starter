// server state reducer

import { ServerStateActions } from '../actions/serverstate';

const serverStateReducer = (state=null, action) => {
  switch (action.type) {
    case ServerStateActions.setState:
      return { ...action.serverState };

    default:
      return state;
  }
}

export default serverStateReducer;
