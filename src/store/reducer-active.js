import {ActionType} from './actions.js';

const reducerActive = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVECITY:
      return {...state, city: action.payload};
    case ActionType.CHANGE_ACTIVESORT:
      return {...state, sort: action.payload};
    case ActionType.CHANGE_ACTIVEOFFER_ID:
      return {...state, offerId: action.payload};
    default:
      return {...state};
  }
};

export default reducerActive;
