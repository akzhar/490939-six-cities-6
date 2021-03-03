import {ActionType} from './actions.js';
import {CITIES, SORT_OPTIONS} from '../const.js';

const initialState = {
  cities: CITIES,
  activeCity: CITIES[0],
  activeSort: SORT_OPTIONS[0],
  activeOfferId: null,
  offers: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {...state, activeCity: action.payload};
    case ActionType.SORT_CHANGE:
      return {...state, activeSort: action.payload};
    case ActionType.OFFER_SET_ACTIVE:
      return {...state, activeOfferId: action.payload};
    case ActionType.OFFERS_LOAD:
      return {...state, offers: action.payload};
    default:
      return {...initialState};
  }
};

export default reducer;
