import api from '../api.js';

export const ActionType = {
  CHANGE_ACTIVECITY: `change/activeCity`,
  CHANGE_ACTIVESORT: `change/activeSort`,
  CHANGE_ACTIVEOFFER_ID: `change/activeOfferId`,
  SET_OFFERS_IS_LOADED: `set/offersIsLoaded`,
  UPDATE_OFFERS: `update/offers`
};

export const ActionCreator = {
  loadOffers: (dispatch, _getStore) => {
    api.get(`/hotels`)
      .then((response) => {
        dispatch({
          type: ActionType.UPDATE_OFFERS,
          payload: response.data
        });
        dispatch({type: ActionType.SET_OFFERS_IS_LOADED});
      });
  },
  changeActiveCity: (newActiveCity) => ({
    type: ActionType.CHANGE_ACTIVECITY,
    payload: newActiveCity
  }),
  changeActiveSort: (newActiveSort) => ({
    type: ActionType.CHANGE_ACTIVESORT,
    payload: newActiveSort
  }),
  setActiveOfferId: (activeOfferId) => ({
    type: ActionType.CHANGE_ACTIVEOFFER_ID,
    payload: activeOfferId
  })
};
