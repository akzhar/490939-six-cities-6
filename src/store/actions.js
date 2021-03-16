import getApi, {apiRoute} from '../api.js';
import browserHistory from '../browser-history.js';

const api = getApi();

export const ActionType = {
  CHANGE_ACTIVECITY: `change/active/city`,
  CHANGE_ACTIVESORT: `change/active/sort`,
  CHANGE_ACTIVEOFFER_ID: `change/active/offerId`,
  SET_OFFERS_IS_LOADED: `set/offers/isLoaded`,
  UPDATE_OFFERS: `update/offers/all`,
  CHANGE_AUTHORIZED_STATUS: `change/user/isAutorized`,
  CHANGE_AUTHORIZED_USER_EMAIL: `change/user/email`,
  CHANGE_AUTHORIZED_USER_AVATAR: `change/user/avatarUrl`,
  REDIRECT_TO: `history/redirectTo`
};

export const ActionCreator = {
  updateOffers: (dispatch, _getStore) => {
    api.get(apiRoute.get.offers)
      .then((response) => {
        const offers = response.data;
        dispatch({type: ActionType.UPDATE_OFFERS, payload: offers});
      })
      .then(() => dispatch({type: ActionType.SET_OFFERS_IS_LOADED}))
      .catch((error) => {
        throw error;
      });
  },
  changeActiveCity: (newActiveCity) => ({type: ActionType.CHANGE_ACTIVECITY, payload: newActiveCity}),
  changeActiveSort: (newActiveSort) => ({type: ActionType.CHANGE_ACTIVESORT, payload: newActiveSort}),
  changeActiveOfferId: (activeOfferId) => ({type: ActionType.CHANGE_ACTIVEOFFER_ID, payload: activeOfferId}),
  checkLogin: (dispatch, _getState) => {
    api.get(apiRoute.get.login)
      .then((response) => {
        dispatch({type: ActionType.CHANGE_AUTHORIZED_USER_EMAIL, payload: response.data.email});
        dispatch({type: ActionType.CHANGE_AUTHORIZED_USER_AVATAR, payload: response.data[`avatar_url`]});
        dispatch({type: ActionType.CHANGE_AUTHORIZED_STATUS, payload: true});
      })
      .catch(() => dispatch({type: ActionType.CHANGE_AUTHORIZED_STATUS, payload: false}))
      .catch((error) => {
        throw error;
      });
  },
  login: (loginInfo, onSuccess) => (dispatch, _getState) => {
    api.post(apiRoute.post.login, loginInfo)
      .then((response) => {
        dispatch({type: ActionType.CHANGE_AUTHORIZED_USER_EMAIL, payload: response.data.email});
        dispatch({type: ActionType.CHANGE_AUTHORIZED_USER_AVATAR, payload: response.data[`avatar_url`]});
      })
      .then(() => dispatch({type: ActionType.CHANGE_AUTHORIZED_STATUS, payload: true}))
      .then(onSuccess)
      .catch((error) => {
        throw error;
      });
  },
  logout: (dispatch, _getState) => {
    api.get(apiRoute.get.logout)
      .then(() => dispatch({type: ActionType.CHANGE_AUTHORIZED_STATUS, payload: false}))
      .catch((error) => {
        throw error;
      });
  },
  redirectTo: (to) => (dispatch, _getState) => {
    dispatch({type: ActionType.REDIRECT_TO});
    browserHistory.push(to);
  }
};
