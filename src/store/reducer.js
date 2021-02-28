import {ActionType} from './actions.js';
import offers from '../mocks/offers.json';
import reviews from '../mocks/reviews.json';
import {CITIES} from '../const.json';

// TODO: move to utils
// получаем массив из имеющихся городов, пока нет связи с сервером список статичен
// const cities = offers.map((offer) => offer.city.name)
//               .filter((value, index, self) => self.indexOf(value) === index);

const initialState = {
  cities: CITIES,
  city: `Paris`,
  sort: `Popular`,
  activeOffer: null,
  offers,
  reviews
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {...state, city: action.payload};
    case ActionType.SORT_CHANGE:
      return {...state, sort: action.payload};
    case ActionType.OFFER_SET_ACTIVE:
      return {...state, activeOffer: action.payload};
    default:
      return {...initialState};
  }
};

export default reducer;
