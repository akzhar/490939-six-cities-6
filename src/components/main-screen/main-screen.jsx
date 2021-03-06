import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Class} from '../../const.js';

import Header from '../header/header.jsx';
import MainScreenMap from '../main-screen-map/main-screen-map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import PlacesMainEmpty from '../places-main-empty/places-main-empty.jsx';
import PlacesMainLoading from '../places-main-loading/places-main-loading.jsx';
import PlacesMain from '../places-main/places-main.jsx';

const MainScreen = ({offersIsLoaded, hasOffers}) => (
  <div className="page page--gray page--main">
    <Header isMain={true}/>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList/>
        </section>
      </div>
      <div className="cities">
        <div className={`cities__places-container container ${(offersIsLoaded && !hasOffers) && Class.PLACES_EMPTY}`}>
          {(!offersIsLoaded && !hasOffers) && <PlacesMainLoading/>}
          {(offersIsLoaded && hasOffers) && <PlacesMain/>}
          {(offersIsLoaded && !hasOffers) && <PlacesMainEmpty/>}
          <div className="cities__right-section">
            <section className="cities__map map">
              {(offersIsLoaded && hasOffers) && <MainScreenMap/>}
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const mapStateToProps = (state) => ({
  offersIsLoaded: state.offersIsLoaded,
  hasOffers: state.offers.some((offer) => offer.city.name === state.activeCity)
});

MainScreen.propTypes = {
  offersIsLoaded: PropTypes.bool.isRequired,
  hasOffers: PropTypes.bool.isRequired
};

export {MainScreen};
export default connect(mapStateToProps, null)(MainScreen);
