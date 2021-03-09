import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../header/header.jsx';

const NotFoundScreen = () => (
  <div className="page">
    <Header/>
    <main className="page__main page__main--property">
      <div className="container">
        <p style={{textAlign: `center`}}>
          <span>404</span><small> - nothing was found...</small>
        </p>
        <Link to="/" className="locations__item-link">Go to the main page</Link>
      </div>
    </main>
  </div>
);

export default NotFoundScreen;
