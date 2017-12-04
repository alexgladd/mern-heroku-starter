// user reducer

import { UserActions } from '../actions/user';
import store from '../util/localstore';

const userReducer = (state=null, action) => {
  switch (action.type) {
    case UserActions.login:
      store.setUserInfo(action.user);
      return { ...action.user };

    case UserActions.logout:
      store.clearUserInfo();
      return null;

    default:
      return state;
  }
}

export default userReducer;
