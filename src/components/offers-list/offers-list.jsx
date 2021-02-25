import React from 'react';
const {useState} = React;
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({offers, className = ``}) => {

  const [, setActive] = useState(null);

  function handleOfferCardHover(evt) {
    setActive(evt.currentTarget.dataset.id);
  }

  function handleOfferCardBlur() {
    setActive(null);
  }

  return <div className={`places__list cities__places-list tabs__content ${className}`}>
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        dataId={offer.id}
        handleOfferCardHover={handleOfferCardHover}
        handleOfferCardBlur={handleOfferCardBlur}
      />
    ))}
  </div>;
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  className: PropTypes.string
};

export default OffersList;
