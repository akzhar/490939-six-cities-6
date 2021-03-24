import {ActionType} from './actions.js';

const initialStateOffers = {
  isLoaded: false,
  items: []
};

const reducerOffers = (state = initialStateOffers, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS_IS_LOADED:
      return {...state, isLoaded: true};
    case ActionType.UPDATE_OFFERS:
      return {...state, items: action.payload};
    default:
      return {...state};
  }
};

export default reducerOffers;
