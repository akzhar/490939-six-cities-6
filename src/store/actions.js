import getApi, {apiRoute} from '../api.js';
import browserHistory from '../browser-history.js';

const api = getApi();

export const ActionType = {
  CHANGE_ACTIVECITY_NAME: `change/active/city/name`,
  SET_ACTIVECITY_HASOFFERS: `set/active/city/hasOffers`,
  CHANGE_ACTIVESORT: `change/active/sort`,
  CHANGE_ACTIVEOFFER_ID: `change/active/offerId`,
  SET_OFFERS_IS_LOADED: `set/offers/isLoaded`,
  UPDATE_OFFERS: `update/offers/items`,
  SET_USER_IS_AUTHORIZED: `set/user/isAutorized`,
  CHANGE_AUTHORIZED_USER_EMAIL: `change/user/email`,
  CHANGE_AUTHORIZED_USER_AVATAR: `change/user/avatarUrl`,
  REDIRECT_TO: `history/redirectTo`
};

export const ActionCreator = {
  updateOffers: (onSuccess = null, onFail = null) => (dispatch, getState) => {
    api.get(apiRoute.get.offers)
      .then((response) => {
        const offers = response.data;
        dispatch({type: ActionType.UPDATE_OFFERS, payload: offers});
      })
      .then(() => {
        const isLoaded = getState().offers.isLoaded;
        if (!isLoaded) {
          dispatch({type: ActionType.SET_OFFERS_IS_LOADED});
        }
      })
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        if (onFail) {
          onFail();
        }
        throw error;
      });
  },
  bookMarkOffer: (isBookmarked, offerId) => (dispatch, getState) => {
    api.post(apiRoute.post.favorites(offerId, +isBookmarked))
      .then((response) => {
        const offers = getState().offers.items.slice();
        const newFavoriteOffer = offers.find((offer) => offer.id === response.data.id);
        newFavoriteOffer[`is_favorite`] = isBookmarked;
        dispatch({type: ActionType.UPDATE_OFFERS, payload: offers});
      })
      .catch((error) => {
        throw error;
      });
  },
  changeActiveCityName: (newName) => (dispatch, _getState) => {
    dispatch({type: ActionType.CHANGE_ACTIVECITY_NAME, payload: newName});
  },
  setActiveCityHasOffers: () => (dispatch, getState) => {
    const {offers, active} = getState();
    const hasOffers = offers.items.some((offer) => offer.city.name === active.city.name);
    dispatch({type: ActionType.SET_ACTIVECITY_HASOFFERS, payload: hasOffers});
  },
  changeActiveSort: (newActiveSort) => ({type: ActionType.CHANGE_ACTIVESORT, payload: newActiveSort}),
  changeActiveOfferId: (activeOfferId) => ({type: ActionType.CHANGE_ACTIVEOFFER_ID, payload: activeOfferId}),
  checkLogin: (onSuccess = null, onFail = null) => (dispatch, _getState) => {
    api.get(apiRoute.get.login)
      .then((response) => {
        dispatch({type: ActionType.CHANGE_AUTHORIZED_USER_EMAIL, payload: response.data.email});
        dispatch({type: ActionType.CHANGE_AUTHORIZED_USER_AVATAR, payload: response.data[`avatar_url`]});
        dispatch({type: ActionType.SET_USER_IS_AUTHORIZED, payload: true});
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch({type: ActionType.SET_USER_IS_AUTHORIZED, payload: false});
        if (onFail) {
          onFail();
        }
        throw error;
      });
  },
  login: (loginInfo, onSuccess = null, onFail = null) => (dispatch, _getState) => {
    api.post(apiRoute.post.login, loginInfo)
      .then((response) => {
        dispatch({type: ActionType.CHANGE_AUTHORIZED_USER_EMAIL, payload: response.data.email});
        dispatch({type: ActionType.CHANGE_AUTHORIZED_USER_AVATAR, payload: response.data[`avatar_url`]});
      })
      .then(() => dispatch({type: ActionType.SET_USER_IS_AUTHORIZED, payload: true}))
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        if (onFail) {
          onFail();
        }
        throw error;
      });
  },
  logout: (dispatch, _getState) => {
    api.get(apiRoute.get.logout)
      .then(() => dispatch({type: ActionType.SET_USER_IS_AUTHORIZED, payload: false}))
      .catch((error) => {
        throw error;
      });
  },
  redirectTo: (to) => (dispatch, _getState) => {
    dispatch({type: ActionType.REDIRECT_TO});
    browserHistory.push(to);
  }
};
