import {combineReducers} from 'redux';
import reducerActive from './reducer-active.js';
import reducerHistory from './reducer-history.js';
import reducerOffers from './reducer-offers.js';
import reducerUser from './reducer-user.js';

import {CITIES, SORT_OPTIONS} from '../const.js';

const initialState = {
  active: {
    city: CITIES[0],
    sort: SORT_OPTIONS[0],
    offerId: null,
  },
  offers: {
    isLoaded: false,
    all: [],
  },
  user: {
    isAuthorized: false,
    email: null,
    avatarUrl: null
  }
};

const reducer = combineReducers({
  active: reducerActive,
  history: reducerHistory,
  offers: reducerOffers,
  user: reducerUser
});

export {initialState};
export default reducer;
