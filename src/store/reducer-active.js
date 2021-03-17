import {ActionType} from './actions.js';
import {CITIES, SORT_OPTIONS} from '../const.js';

const initialStateActive = {
  city: {
    name: CITIES[0],
    hasOffers: false
  },
  sort: SORT_OPTIONS[0],
  offerId: null
};

const reducerActive = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVECITY_NAME:
      return {...state, city: {...state.city, name: action.payload}};
    case ActionType.SET_ACTIVECITY_HASOFFERS:
      return {...state, city: {...state.city, hasOffers: action.payload}};
    case ActionType.CHANGE_ACTIVESORT:
      return {...state, sort: action.payload};
    case ActionType.CHANGE_ACTIVEOFFER_ID:
      return {...state, offerId: action.payload};
    default:
      return {...state};
  }
};

export {initialStateActive};
export default reducerActive;
