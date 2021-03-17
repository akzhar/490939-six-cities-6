import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer, {initialState} from './store/reducer.js';
import thunk from 'redux-thunk';
import {ActionCreator} from './store/actions.js';

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

// temp logout
// store.dispatch(ActionCreator.logout);
store.dispatch(ActionCreator.checkLogin());
store.dispatch(ActionCreator.updateOffers(() => {
  store.dispatch(ActionCreator.setActiveCityHasOffers());
}));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
