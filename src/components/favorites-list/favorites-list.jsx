import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {favoritesSelector, favoriteCitiesSelector} from '../../store/selectors.js';
import {AppRoute} from '../../const.js';

import FavoritesCard from '../favorites-card/favorites-card.jsx';

const FavoritesList = ({favorites, favoriteSities, changeActiveCityName, setActiveCityHasOffers, redirectTo}) => {

  const handleLocationLinkClick = (evt) => {
    const newCity = evt.currentTarget.querySelector(`span`).textContent;
    changeActiveCityName(newCity);
    setActiveCityHasOffers();
    redirectTo(AppRoute.MAIN);
  };

  return <div className="page__favorites-container container">
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoriteSities.map((city) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" onClick={handleLocationLinkClick}>
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              { favorites
                .filter((offer) => offer.city.name === city)
                .map((offer) => {
                  if (city === offer.city.name) {
                    return <FavoritesCard key={offer.id} offer={offer}/>;
                  }
                  return null;
                })
              }
            </div>
          </li>
        ))}
      </ul>
    </section>
  </div>;
};

const mapStateToProps = (state) => ({
  favorites: favoritesSelector(state),
  favoriteSities: favoriteCitiesSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveCityName: (newName) => dispatch(ActionCreator.changeActiveCityName(newName)),
  setActiveCityHasOffers: () => dispatch(ActionCreator.setActiveCityHasOffers()),
  redirectTo: (to) => dispatch(ActionCreator.redirectTo(to))
});

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  favoriteSities: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeActiveCityName: PropTypes.func.isRequired,
  setActiveCityHasOffers: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

export {FavoritesList};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);
