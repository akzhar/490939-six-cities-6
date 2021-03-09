import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import OffersList from '../offers-list/offers-list.jsx';

const PlacesNear = ({offers}) => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="near-places__list places__list">
      <OffersList offers={offers}/>
    </div>
  </section>
);

PlacesNear.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired
};

export default PlacesNear;
