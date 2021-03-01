import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';

import SortOptions from '../sort-options/sort-options.jsx';
import OffersList from '../offers-list/offers-list.jsx';

const PlacesMain = ({city, offers}) => {

  return <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offers.length} places to stay in {city}</b>
    <SortOptions/>
    <OffersList/>
  </section>;
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers.filter((offer) => offer.city.name === state.city)
});

PlacesMain.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired
};

export {PlacesMain};
export default connect(mapStateToProps, null)(PlacesMain);
