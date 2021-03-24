import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getHasFavorites} from '../../store/selectors.js';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import FavoritesList from '../favorites-list/favorites-list.jsx';
import FavoritesListEmpty from '../favorites-list-empty/favorites-list-empty.jsx';

const FavoritesScreen = ({hasFavorites}) => (
  <div className="page">
    <Header/>
    <main className={`page__main page__main--favorites ${!hasFavorites && `page__main--favorites-empty`}`}>
      {hasFavorites ? <FavoritesList/> : <FavoritesListEmpty/>}
    </main>
    <Footer/>
  </div>
);

FavoritesScreen.propTypes = {
  hasFavorites: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  hasFavorites: getHasFavorites(state)
});

export {FavoritesList};
export default connect(mapStateToProps, null)(FavoritesScreen);
