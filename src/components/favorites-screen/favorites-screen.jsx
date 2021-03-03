import React from 'react';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import FavoritesList from '../favorites-list/favorites-list.jsx';

const FavoritesScreen = () => (
  <React.Fragment>
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesList/>
            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  </React.Fragment>
);

export default FavoritesScreen;
