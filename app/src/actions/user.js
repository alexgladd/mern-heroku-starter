// user actions

import api from '../util/api';

export const UserActions = {
  login: 'USER_LOGIN',
  logout: 'USER_LOGOUT'
};

export const loginUser = (userInfo) => ({
  type: UserActions.login,
  user: userInfo
});

export const logoutUser = () => ({
  type: UserActions.logout
});

export const oauthAuthenticate = (network, code) => {
  return async (dispatch) => {
    try {
      const authResult = await api.oauthAuthenticate(network, code);
      console.log('Got oauth result', authResult);
      dispatch(loginUser({ name: authResult.name }));
    } catch(err) {
      console.error('OAuth authentication failure', err);
    }
  };
}
