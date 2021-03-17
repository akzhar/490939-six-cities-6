import {combineReducers} from 'redux';
import reducerActive, {initialStateActive} from './reducer-active.js';
import reducerOffers, {initialStateOffers} from './reducer-offers.js';
import reducerUser, {initialStateUser} from './reducer-user.js';

const initialState = {
  active: initialStateActive,
  offers: initialStateOffers,
  user: initialStateUser
};

const reducer = combineReducers({
  active: reducerActive,
  offers: reducerOffers,
  user: reducerUser
});

export {initialState};
export default reducer;
