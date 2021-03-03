import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {SortToCompareFunc} from '../../const.js';

import SortOptions from '../sort-options/sort-options.jsx';
import OffersList from '../offers-list/offers-list.jsx';

const PlacesMain = ({sort, city, offers, setActiveOfferId}) => {

  function handleHover(evt) {
    setActiveOfferId(evt.currentTarget.dataset.id);
  }

  function handleBlur() {
    setActiveOfferId(null);
  }

  return <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offers.length} places to stay in {city}</b>
    <SortOptions/>
    <div className="cities__places-list places__list tabs__content">
      <OffersList
        offers={offers.sort(SortToCompareFunc[sort])}
        handleHover={handleHover}
        handleBlur={handleBlur}
      />
    </div>
  </section>;
};

const mapStateToProps = (state) => ({
  sort: state.sort,
  city: state.city,
  offers: state.offers.filter((offer) => offer.city.name === state.city)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOfferId: (activeOfferId) => {
    dispatch(ActionCreator.setActiveOfferId(activeOfferId));
  }
});

PlacesMain.propTypes = {
  sort: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  setActiveOfferId: PropTypes.func.isRequired
};

export {PlacesMain};
export default connect(mapStateToProps, mapDispatchToProps)(PlacesMain);
