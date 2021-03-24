import {combineReducers} from 'redux';
import reducerActive from './reducer-active.js';
import reducerOffers from './reducer-offers.js';
import reducerPopup from './reducer-popup.js';
import reducerUser from './reducer-user.js';

const reducer = combineReducers({
  active: reducerActive,
  offers: reducerOffers,
  popup: reducerPopup,
  user: reducerUser
});

export default reducer;
