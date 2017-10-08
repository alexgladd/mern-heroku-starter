// authentication reducers
import { authActions } from '../actions/auth';

const defaultAuthState = {
  authenticated: false,
  apiToken: null,
  github: {
    clientId: '8959958c36292d0b35d6',
    code: null
  }
};

const assignOauthCode = (newState, network, code) => {
  switch (network) {
    case 'github':
      const gh = Object.assign({}, newState.github, { code });
      newState.github = gh;
      break;

    default:
      console.error('Unknown oauth network: ' + network);
  }
}

const authReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case authActions.oauthAuthorized:
      let authState = Object.assign({}, state);
      assignOauthCode(authState, action.network, action.code);
      return authState;

    case authActions.authenticated:
      return Object.assign({}, state, { authenticated: true, apiToken: action.token });

    default:
      return state;
  }
}

export default authReducer;
