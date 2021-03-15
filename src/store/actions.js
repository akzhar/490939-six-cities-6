import getApi, {apiRoute} from '../api.js';
import browserHistory from '../browser-history.js';

const api = getApi();

export const ActionType = {
  CHANGE_ACTIVECITY: `change/activeCity`,
  CHANGE_ACTIVESORT: `change/activeSort`,
  CHANGE_ACTIVEOFFER_ID: `change/activeOfferId`,
  SET_OFFERS_IS_LOADED: `set/offersIsLoaded`,
  UPDATE_OFFERS: `update/offers`,
  CHANGE_AUTORIZED_STATUS: `change/isAutorized`,
  CHANGE_AUTORIZED_USER: `change/user`,
  REDIRECT_TO: `redirectTo`
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
      .then(() => dispatch({type: ActionType.CHANGE_AUTORIZED_STATUS, payload: true}))
      .catch(() => dispatch({type: ActionType.CHANGE_AUTORIZED_STATUS, payload: false}))
      .catch((error) => {
        throw error;
      });
  },
  login: (loginInfo, onSuccess) => (dispatch, _getState) => {
    api.post(apiRoute.post.login, loginInfo)
      .then((response) => {
        const user = {
          email: response.data.email,
          avatarUrl: response.data[`avatar_url`]
        };
        dispatch({type: ActionType.CHANGE_AUTORIZED_USER, payload: user});
      })
      .then(() => dispatch({type: ActionType.CHANGE_AUTORIZED_STATUS, payload: true}))
      .then(onSuccess)
      .catch((error) => {
        throw error;
      });
  },
  logout: (dispatch, _getState) => {
    api.get(apiRoute.get.logout)
      .then(() => dispatch({type: ActionType.CHANGE_AUTORIZED_STATUS, payload: false}))
      .catch((error) => {
        throw error;
      });
  },
  redirectTo: (to) => (dispatch, _getState) => {
    dispatch({type: ActionType.REDIRECT_TO});
    browserHistory.push(to);
  }
};
