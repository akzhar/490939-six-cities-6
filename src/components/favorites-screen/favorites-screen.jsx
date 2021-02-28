import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import FavoritesOfferCard from '../favorites-offer-card/favorites-offer-card.jsx';

const FavoritesScreen = ({offers, cities}) => { // сейчас выводятся не favorites, а все offers подряд

  return <React.Fragment>
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offers.map((offer) => {
                      if (city === offer.city.name) {
                        return <FavoritesOfferCard key={offer.id} offer={offer}/>;
                      }
                      return null;
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  </React.Fragment>;
};

const mapStateToProps = (state) => ({
  offers: state.offers.filter((offer) => offer.city.name === state.city),
  cities: state.cities
});

FavoritesScreen.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

export {FavoritesScreen};
export default connect(mapStateToProps, null)(FavoritesScreen);
