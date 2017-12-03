// authentication actions

import api from '../util/api';

export const authActions = {
  oauthAuthorized: 'OAUTH_AUTHORIZED',
  authenticated: 'AUTHENTICATED'
};

export const oauthAuthorized = (network, code) => ({
  type: authActions.oauthAuthorized,
  network,
  code
});

export const authenticated = (token) => ({
  type: authActions.authenticated,
  token
});

export const finishOauth = (network, code) => {
  return async (dispatch) => {
    try {
      const authResult = await api.oauthAuthenticate(network, code);
      console.log('Got auth result', authResult);
      dispatch(authenticated('fake token'));
    } catch(err) {
      console.error('OAuth authentication failure', err);
    }
  };
}
