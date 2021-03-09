import getApi, {apiRoute} from '../api.js';

const api = getApi();

export const ActionType = {
  CHANGE_ACTIVECITY: `change/activeCity`,
  CHANGE_ACTIVESORT: `change/activeSort`,
  CHANGE_ACTIVEOFFER_ID: `change/activeOfferId`,
  SET_OFFERS_IS_LOADED: `set/offersIsLoaded`,
  UPDATE_OFFERS: `update/offers`,
  SET_IS_AUTORIZED: `set/isAutorized`
};

export const ActionCreator = {
  updateOffers: (dispatch, _getStore) => {
    api.get(apiRoute.get.offers)
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
  changeActiveOfferId: (activeOfferId) => ({
    type: ActionType.CHANGE_ACTIVEOFFER_ID,
    payload: activeOfferId
  }),
  login: (dispatch, _getState) => {
    api.get(apiRoute.get.login)
      .then(() => {
        dispatch({type: ActionType.SET_IS_AUTORIZED});
      });
  }
};
