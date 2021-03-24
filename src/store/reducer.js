import {combineReducers} from 'redux';
import reducerActive from './reducer-active.js';
import reducerOffers from './reducer-offers.js';
import reducerUser from './reducer-user.js';

const reducer = combineReducers({
  active: reducerActive,
  offers: reducerOffers,
  user: reducerUser
});

export default reducer;
