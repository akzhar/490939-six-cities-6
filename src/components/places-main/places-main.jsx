import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';

import SortOptions from '../sort-options/sort-options.jsx';
import OffersList from '../offers-list/offers-list.jsx';

const PlacesMain = ({city, sort, offers}) => {

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

  return <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offers.length} places to stay in {city}</b>
    <SortOptions/>
    <OffersList offers={getSortedOffers()}/>
  </section>;
};

const mapStateToProps = (state) => ({
  city: state.city,
  sort: state.sort,
  offers: state.offers.filter((offer) => offer.city.name === state.city)
});

PlacesMain.propTypes = {
  city: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired
};

export {PlacesMain};
export default connect(mapStateToProps, null)(PlacesMain);
