import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import Map from '../map/map.jsx';
import PlacesMainEmpty from '../places-main-empty/places-main-empty.jsx';
import PlacesMain from '../places-main/places-main.jsx';

const MainScreen = ({city, offers, onCityChange}) => {

  const tabsListRef = useRef();

  // TODO: move css classes to const
  const handleCityTabClick = (evt) => {
    const activeTab = evt.currentTarget;
    const newCity = activeTab.querySelector(`span`).textContent;
    onCityChange(newCity);
    const tabs = tabsListRef.current.querySelectorAll(`.tabs__item`);
    tabs.forEach((tab) => tab.classList.remove(`tabs__item--active`));
    activeTab.classList.add(`tabs__item--active`);
  };

  return <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list" ref={tabsListRef}>
            {[`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`].map((cityName) => (
              <li className="locations__item" key={cityName}>
                <a className={`locations__item-link tabs__item ${(cityName === city) ? `tabs__item--active` : ``}`} onClick={handleCityTabClick}>
                  <span>{cityName}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className={`cities__places-container container ${offers.length ? `` : `cities__places-container--empty container`}`}>
          {offers.length ? <PlacesMain/> : <PlacesMainEmpty/>}
          <div className="cities__right-section">
            <section className="cities__map map">
              {offers.length ?
                <Map
                  city={offers[0].city.location}
                  points={
                    offers.map((offer) => {
                      return {
                        lat: offer.city.location.latitude,
                        lng: offer.city.location.longitude,
                        title: offer.title
                      };
                    })
                  }
                /> : ``}
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>;
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers.filter((offer) => offer.city.name === state.city)
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(newCity) {
    dispatch(ActionCreator.changeCity(newCity));
  },
});

MainScreen.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  onCityChange: PropTypes.func.isRequired
};

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
