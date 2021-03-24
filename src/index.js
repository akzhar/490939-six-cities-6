import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer.js';
import thunk from 'redux-thunk';
import {ActionCreator} from './store/actions.js';
import {Message} from './const.js';

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

store.dispatch(ActionCreator.checkLogin());
const onFail = () => {
  store.dispatch(ActionCreator.showPopup(Message.ERROR.OFFERS_WAS_NOT_LOADED));
};
store.dispatch(ActionCreator.updateOffers(null, onFail));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
