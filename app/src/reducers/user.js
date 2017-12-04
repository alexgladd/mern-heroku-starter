// user reducer

import { UserActions } from '../actions/user';

const userReducer = (state=null, action) => {
  switch (action.type) {
    case UserActions.login:
      return { ...action.user };

    case UserActions.logout:
      return null;

    default:
      return state;
  }
}

export default userReducer;
