import React from 'react';
import PropTypes from 'prop-types';
import {mapCityTypes, mapPointTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';
import {getCity, getPoints} from '../../store/selectors.js';

import Map from '../map/map.jsx';

const MainScreenMap = ({city, points, activeOfferId}) => (
  <section className="cities__map map">
    <Map city={city} points={points} activeOfferId={activeOfferId}/>
  </section>
);

const mapStateToProps = (state) => ({
  city: getCity(state),
  points: getPoints(state),
  activeOfferId: state.active.offerId
});

MainScreenMap.propTypes = {
  city: PropTypes.shape(mapCityTypes).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape(mapPointTypes)).isRequired,
  activeOfferId: PropTypes.string
};

export {MainScreenMap};
export default connect(mapStateToProps, null)(MainScreenMap);
