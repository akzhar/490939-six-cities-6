import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({offers, handleHover = null, handleBlur = null}) => (
  <React.Fragment>
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        handleHover={handleHover}
        handleBlur={handleBlur}
      />
    ))}
  </React.Fragment>
);

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  handleHover: PropTypes.func,
  handleBlur: PropTypes.func
};

export default OffersList;
