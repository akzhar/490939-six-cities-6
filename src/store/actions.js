import getApi from '../api.js';
import {apiRoute} from '../const.js';
import browserHistory from '../browser-history.js';

const api = getApi();

export const ActionType = {
  CHANGE_ACTIVECITY_NAME: `active/change/city/name`,
  CHANGE_ACTIVESORT: `active/change/sort`,
  CHANGE_ACTIVEOFFER_ID: `active/change/offerId`,
  SET_OFFERS_IS_LOADED: `offers/set/isLoaded`,
  UPDATE_OFFERS: `offers/update/items`,
  GET_OFFER_REVIEWS: `ofer/get/reviews`,
  POST_OFFER_REVIEW: `offer/post/review`,
  SET_USER_IS_AUTHORIZED: `user/set/isAutorized`,
  CHANGE_AUTHORIZED_USER_EMAIL: `user/change/email`,
  CHANGE_AUTHORIZED_USER_AVATAR: `user/change/avatarUrl`,
  REDIRECT_TO: `history/redirectTo`,
  SET_POPUP_ISOPEN: `popup/set/isOpen`,
  CHANGE_POPUP_MESSAGE: `popup/change/message`
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
          onFail(error);
        }
        throw error;
      });
  },
  getReviews: (offerId, onSuccess = null, onFail = null) => (dispatch, _getState) => {
    api.get(apiRoute.get.reviews(offerId))
      .then((response) => {
        dispatch({type: ActionType.GET_OFFER_REVIEWS});
        if (onSuccess) {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        if (onFail) {
          onFail(error);
        }
        throw error;
      });
  },
  postOfferReview: (offerId, newReview, onSuccess = null, onFail = null, onAnyResult = null) => (dispatch, _getState) => {
    api.post(apiRoute.post.comment(offerId), newReview)
      .then((response) => {
        dispatch({type: ActionType.POST_OFFER_REVIEW});
        if (onSuccess) {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        if (onFail) {
          onFail(error);
        }
        throw error;
      })
      .finally(() => {
        if (onAnyResult) {
          onAnyResult();
        }
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
          onFail(error);
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
          onFail(error);
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
  },
  hidePopup: () => (dispatch, _getState) => {
    dispatch({type: ActionType.SET_POPUP_ISOPEN, payload: false});
    dispatch({type: ActionType.CHANGE_POPUP_MESSAGE, payload: ``});
  },
  showPopup: (message) => (dispatch, _getState) => {
    dispatch({type: ActionType.SET_POPUP_ISOPEN, payload: true});
    dispatch({type: ActionType.CHANGE_POPUP_MESSAGE, payload: message});
  }
};
