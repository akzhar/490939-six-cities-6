import offers from '../mocks/offers.json';

const initialState = {
  city: offers[0].city.location,
  offers
};

const reducer = (state, action) => {
  switch (action.type) {
    case `city/change`:
      const newCity = action.payload;
      const newCityOffers = state.offers.filter((offer) => offer.city.name === newCity);
      return {...state, city: newCity, offers: newCityOffers};
    case `offers/ready`:
      return {...state};
    default:
      return {...initialState};
  }
};

export default reducer;
