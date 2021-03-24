import {ActionType} from './actions.js';
import {CITIES, SORT_OPTIONS} from '../const.js';

const initialStateActive = {
  city: {
    name: CITIES[0]
  },
  sort: SORT_OPTIONS[0],
  offerId: null
};

const reducerActive = (state = initialStateActive, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVECITY_NAME:
      return {...state, city: {...state.city, name: action.payload}};
    case ActionType.CHANGE_ACTIVESORT:
      return {...state, sort: action.payload};
    case ActionType.CHANGE_ACTIVEOFFER_ID:
      return {...state, offerId: action.payload};
    default:
      return {...state};
  }
};

export default reducerActive;
