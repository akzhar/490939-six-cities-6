import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import OffersList from '../offers-list/offers-list.jsx';

const PlacesMain = ({offers}) => (
  <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
          Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li className="places__option places__option--active" tabIndex="0">Popular</li>
        <li className="places__option" tabIndex="0">Price: low to high</li>
        <li className="places__option" tabIndex="0">Price: high to low</li>
        <li className="places__option" tabIndex="0">Top rated first</li>
      </ul>
    </form>
    <OffersList offers={offers}/>
  </section>
);

PlacesMain.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired
};

export default PlacesMain;
