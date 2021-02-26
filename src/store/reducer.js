import {ActionType} from './actions.js';
import offers from '../mocks/offers.json';

const initialState = {
  city: `Paris`,
  offers
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {...state, city: action.payload};
    default:
      return {...initialState};
  }
};

export default reducer;
