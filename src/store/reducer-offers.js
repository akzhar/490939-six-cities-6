import {ActionType} from './actions.js';

const reducerOffers = (state, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS_IS_LOADED:
      return {...state, isLoaded: true};
    case ActionType.UPDATE_OFFERS:
      return {...state, all: action.payload};
    default:
      return {...state};
  }
};

export default reducerOffers;
