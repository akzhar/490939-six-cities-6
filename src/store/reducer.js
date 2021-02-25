import {ActionType} from './actions.js';
import offers from '../mocks/offers.json';

const initialState = {
  city: offers[0].city.location,
  offers
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      const newCity = action.payload;
      const newCityOffers = state.offers.filter((offer) => offer.city.name === newCity);
      return {...state, city: newCity, offers: newCityOffers};
    case ActionType.OFFERS_READY:
      return {...state};
    default:
      return {...initialState};
  }
};

export default reducer;
