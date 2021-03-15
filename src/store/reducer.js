import {ActionType} from './actions.js';
import {CITIES, SORT_OPTIONS} from '../const.js';

const initialState = {
  cities: CITIES,
  activeCity: CITIES[0],
  activeSort: SORT_OPTIONS[0],
  activeOfferId: null,
  offersIsLoaded: false,
  offers: [],
  isAuthorized: false,
  user: {
    email: null,
    avatarUrl: null
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVECITY:
      return {...state, activeCity: action.payload};
    case ActionType.CHANGE_ACTIVESORT:
      return {...state, activeSort: action.payload};
    case ActionType.CHANGE_ACTIVEOFFER_ID:
      return {...state, activeOfferId: action.payload};
    case ActionType.SET_OFFERS_IS_LOADED:
      return {...state, offersIsLoaded: true};
    case ActionType.UPDATE_OFFERS:
      return {...state, offers: action.payload};
    case ActionType.CHANGE_AUTORIZED_STATUS:
      return {...state, isAuthorized: action.payload};
    case ActionType.CHANGE_AUTORIZED_USER:
      return {...state, user: action.payload};
    case ActionType.REDIRECT_TO:
      return {...state};
    default:
      return {...initialState};
  }
};

export default reducer;
