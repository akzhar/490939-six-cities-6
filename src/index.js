import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer.js';
import thunk from 'redux-thunk';
import api from './api.js';
import {ActionCreator} from './store/actions.js';

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

const setOffers = (offers) => {
  store.dispatch(ActionCreator.setOffers(offers));
};

api.get(`/hotels`)
  .then((response) => setOffers(response.data))
  .then(() => {
    ReactDOM.render(
        <Provider store={store}>
          <App/>
        </Provider>,
        document.querySelector(`#root`)
    );
  });
