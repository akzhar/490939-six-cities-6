import api from '../api.js';

export const ActionType = {
  OFFERS_IS_LOADED: `offers/loaded`,
  OFFERS_LOAD: `offers/load`,
  CITY_CHANGE: `city/change`,
  SORT_CHANGE: `sort/change`,
  OFFER_SET_ACTIVE: `offer/set/active`
};

export const ActionCreator = {
  loadOffers: () => (dispatch) => {
    api.get(`/hotels`)
      .then((response) => {
        dispatch({type: ActionType.OFFERS_IS_LOADED});
        dispatch({
          type: ActionType.OFFERS_LOAD,
          payload: response.data
        });
      });
  },
  changeActiveCity: (newActiveCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: newActiveCity
  }),
  changeActiveSort: (newActiveSort) => ({
    type: ActionType.SORT_CHANGE,
    payload: newActiveSort
  }),
  setActiveOfferId: (activeOfferId) => ({
    type: ActionType.OFFER_SET_ACTIVE,
    payload: activeOfferId
  })
};
