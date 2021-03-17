import {createSelector} from 'reselect';
import {getPointsArray} from '../utils.js';

const offersItemsSelector = (state) => state.offers.items;
const activeCitySelector = (state) => state.active.city.name;
const activeCityOffersSelector = createSelector(
    offersItemsSelector,
    activeCitySelector,
    (offersItems, activeCity) => offersItems.filter((offer) => offer.city.name === activeCity)
);

export const citySelector = createSelector(
    offersItemsSelector,
    activeCitySelector,
    (offersItems, activeCity) => offersItems.find((offer) => offer.city.name === activeCity).city.location
);

export const pointsSelector = createSelector(
    activeCityOffersSelector,
    (activeCityOffers) => getPointsArray(activeCityOffers)
);

export const favoritesSelector = createSelector(
    offersItemsSelector,
    (offersItems) => offersItems.filter((offer) => offer[`is_favorite`])
);

export const hasFavoritesSelector = createSelector(
    offersItemsSelector,
    (offersItems) => offersItems.some((offer) => offer[`is_favorite`])
);

export const favoriteCitiesSelector = createSelector(
    favoritesSelector,
    (favorites) => {
      return favorites
      .map((offer) => offer.city.name)
      .filter((value, index, self) => self.indexOf(value) === index);
    }
);
