// authentication reducers
import { authActions } from '../actions/auth';

const defaultAuthState = {
  authenticated: false,
  apiToken: null,
  oauth: {
    authorized: false,
    network: null,
    code: null
  },
  githubClientId: '8959958c36292d0b35d6'
};

// const assignOauthCode = (newState, network, code) => {
//   switch (network) {
//     case 'github':
//       const gh = Object.assign({}, newState.github, { code });
//       newState.github = gh;
//       break;
//
//     default:
//       console.error('Unknown oauth network: ' + network);
//   }
// }

const authReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case authActions.oauthAuthorized:
      const oauth = {
        authorized: true,
        network: action.network,
        code: action.code
      };

      return Object.assign({}, state, { oauth });

    case authActions.authenticated:
      return Object.assign({}, state, { authenticated: true, apiToken: action.token });

    default:
      return state;
  }
}

export default authReducer;
