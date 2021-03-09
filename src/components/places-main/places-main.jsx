import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {ActiveSortToCompareFunc} from '../../const.js';

import SortOptions from '../sort-options/sort-options.jsx';
import OffersList from '../offers-list/offers-list.jsx';

const PlacesMain = ({activeSort, activeCity, offers, setActiveOfferId}) => {

  function handleHover(evt) {
    setActiveOfferId(evt.currentTarget.dataset.id);
  }

  function handleBlur() {
    setActiveOfferId(null);
  }

  return <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offers.length} places to stay in {activeCity}</b>
    <SortOptions/>
    <div className="cities__places-list places__list tabs__content">
      <OffersList
        offers={offers.sort(ActiveSortToCompareFunc[activeSort])}
        handleHover={handleHover}
        handleBlur={handleBlur}
      />
    </div>
  </section>;
};

const mapStateToProps = (state) => ({
  activeSort: state.activeSort,
  activeCity: state.activeCity,
  offers: state.offers.filter((offer) => offer.city.name === state.activeCity)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOfferId: (activeOfferId) => {
    dispatch(ActionCreator.setActiveOfferId(activeOfferId));
  }
});

PlacesMain.propTypes = {
  activeSort: PropTypes.string.isRequired,
  activeCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  setActiveOfferId: PropTypes.func.isRequired
};

export {PlacesMain};
export default connect(mapStateToProps, mapDispatchToProps)(PlacesMain);
