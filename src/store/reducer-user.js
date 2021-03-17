import {ActionType} from './actions.js';

const initialStateUser = {
  isAuthorized: false,
  email: null,
  avatarUrl: null
};

const reducerAuthorization = (state, action) => {
  switch (action.type) {
    case ActionType.SET_USER_IS_AUTHORIZED:
      return {...state, isAuthorized: action.payload};
    case ActionType.CHANGE_AUTHORIZED_USER_EMAIL:
      return {...state, email: action.payload};
    case ActionType.CHANGE_AUTHORIZED_USER_AVATAR:
      return {...state, avatarUrl: action.payload};
    default:
      return {...state};
  }
};

export {initialStateUser};
export default reducerAuthorization;
