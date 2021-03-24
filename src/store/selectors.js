import {createSelector} from 'reselect';
import {getPointsArray} from '../utils.js';

const getOffers = (state) => state.offers.items;
const getActiveCity = (state) => state.active.city.name;
const getActiveCityOffers = createSelector(
    getOffers,
    getActiveCity,
    (offersItems, activeCity) => offersItems.filter((offer) => offer.city.name === activeCity)
);

export const getHasOffers = createSelector(
    getOffers,
    getActiveCity,
    (offersItems, activeCity) => offersItems.some((offer) => offer.city.name === activeCity)
);

export const getCity = createSelector(
    getOffers,
    getActiveCity,
    (offersItems, activeCity) => offersItems.find((offer) => offer.city.name === activeCity).city.location
);

export const getPoints = createSelector(
    getActiveCityOffers,
    (activeCityOffers) => getPointsArray(activeCityOffers)
);

export const getFavorites = createSelector(
    getOffers,
    (offersItems) => offersItems.filter((offer) => offer[`is_favorite`])
);

export const getHasFavorites = createSelector(
    getOffers,
    (offersItems) => offersItems.some((offer) => offer[`is_favorite`])
);

export const getFavoriteCities = createSelector(
    getFavorites,
    (favorites) => {
      return favorites
      .map((offer) => offer.city.name)
      .filter((value, index, self) => self.indexOf(value) === index);
    }
);
