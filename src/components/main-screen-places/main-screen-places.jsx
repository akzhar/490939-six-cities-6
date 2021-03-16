import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {ActiveSortToCompareFunc} from '../../const.js';

import SortOptions from '../sort-options/sort-options.jsx';
import OffersList from '../offers-list/offers-list.jsx';

const MainScreenPlaces = ({activeSort, activeCity, offers, changeActiveOfferId}) => {

  const handleHover = useCallback((evt) => {
    changeActiveOfferId(evt.currentTarget.dataset.id);
  }, []);

  const handleBlur = useCallback(() => {
    changeActiveOfferId(null);
  }, []);

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => offer.city.name === activeCity);
  }, [activeCity]);

  const sortedOffers = useMemo(() => {
    return filteredOffers.slice().sort(ActiveSortToCompareFunc[activeSort]);
  }, [activeSort, activeCity]);

  return <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
    <SortOptions/>
    <div className="cities__places-list places__list tabs__content">
      <OffersList
        offers={sortedOffers}
        handleHover={handleHover}
        handleBlur={handleBlur}
      />
    </div>
  </section>;
};

const mapStateToProps = (state) => ({
  activeSort: state.activeSort,
  activeCity: state.activeCity,
  offers: state.offers
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveOfferId: (activeOfferId) => {
    dispatch(ActionCreator.changeActiveOfferId(activeOfferId));
  }
});

MainScreenPlaces.propTypes = {
  activeSort: PropTypes.string.isRequired,
  activeCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  changeActiveOfferId: PropTypes.func.isRequired
};

export {MainScreenPlaces};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreenPlaces);
