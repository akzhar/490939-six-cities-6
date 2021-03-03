import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Class} from '../../const.js';

import Header from '../header/header.jsx';
import MainScreenMap from '../main-screen-map/main-screen-map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import PlacesMainEmpty from '../places-main-empty/places-main-empty.jsx';
import PlacesMain from '../places-main/places-main.jsx';

const MainScreen = ({hasOffers}) => (
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
        <div className={`cities__places-container container ${hasOffers && Class.PLACES_EMPTY}`}>
          {hasOffers ? <PlacesMain/> : <PlacesMainEmpty/>}
          <div className="cities__right-section">
            {hasOffers && <MainScreenMap/>}
          </div>
        </div>
      </div>
    </main>
  </div>
);

const mapStateToProps = (state) => ({
  hasOffers: state.offers.filter((offer) => offer.city.name === state.activeCity).length ? true : false
});

MainScreen.propTypes = {
  hasOffers: PropTypes.bool.isRequired
};

export {MainScreen};
export default connect(mapStateToProps, null)(MainScreen);
