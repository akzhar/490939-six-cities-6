import {ActionType} from './actions.js';

const reducerAuthorization = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTHORIZED_STATUS:
      return {...state, isAuthorized: action.payload};
    case ActionType.CHANGE_AUTHORIZED_USER_EMAIL:
      return {...state, email: action.payload};
    case ActionType.CHANGE_AUTHORIZED_USER_AVATAR:
      return {...state, avatarUrl: action.payload};
    default:
      return {...state};
  }
};

export default reducerAuthorization;
