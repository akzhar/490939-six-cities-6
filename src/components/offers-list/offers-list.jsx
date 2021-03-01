import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({sort, offers, setActiveOffer, className = ``}) => {

  const getSortedOffers = () => {
    switch (sort) {
      case `Price: low to high`:
        return offers.sort((a, b) => a.price - b.price);
      case `Price: high to low`:
        return offers.sort((a, b) => b.price - a.price);
      case `Top rated first`:
        return offers.sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  };

  function handleOfferCardHover(evt) {
    setActiveOffer(evt.currentTarget.dataset.id);
  }

  function handleOfferCardBlur() {
    setActiveOffer(null);
  }

  return <div className={`places__list cities__places-list tabs__content ${className}`}>
    {getSortedOffers().map((offer) => (
      <OfferCard
        key={offer.id}
        dataId={offer.id}
        offer={offer}
        handleOfferCardHover={handleOfferCardHover}
        handleOfferCardBlur={handleOfferCardBlur}
      />
    ))}
  </div>;
};

const mapStateToProps = (state) => ({
  sort: state.sort,
  offers: state.offers.filter((offer) => offer.city.name === state.city)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOffer: (activeOffer) => {
    dispatch(ActionCreator.setActiveOffer(activeOffer));
  }
});

OffersList.propTypes = {
  sort: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  setActiveOffer: PropTypes.func.isRequired,
  className: PropTypes.string
};

export {OffersList};
export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
