import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

import offers from './mocks/offers.json';

ReactDOM.render(
    <App offers={offers}/>,
    document.querySelector(`#root`)
);
