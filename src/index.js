import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

import offers from './mocks/offers.json';
import reviews from './mocks/reviews.json';

ReactDOM.render(
    <App
      offers={offers}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);
