// authentication actions

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
