import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';

import FavoritesCard from '../favorites-card/favorites-card.jsx';

// сейчас выводятся не favorites, а все offers подряд
// locations__item-link должна делать переход на main c выбранным городом?
const FavoritesList = ({offers, cities}) => (
  <React.Fragment>
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
          { offers
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
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  offers: state.offers,
  cities: state.cities
});

FavoritesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

export {FavoritesList};
export default connect(mapStateToProps, null)(FavoritesList);
