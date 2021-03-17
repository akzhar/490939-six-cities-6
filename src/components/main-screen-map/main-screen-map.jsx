import React from 'react';
import PropTypes from 'prop-types';
import {mapCityTypes, mapPointTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';
import {citySelector, pointsSelector} from '../../store/selectors.js';

import Map from '../map/map.jsx';

const MainScreenMap = ({city, points, activeOfferId}) => (
  <Map city={city} points={points} activeOfferId={activeOfferId}/>
);

const mapStateToProps = (state) => ({
  city: citySelector(state),
  points: pointsSelector(state),
  activeOfferId: state.active.offerId
});

MainScreenMap.propTypes = {
  city: PropTypes.shape(mapCityTypes).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape(mapPointTypes)).isRequired,
  activeOfferId: PropTypes.string
};

export {MainScreenMap};
export default connect(mapStateToProps, null)(MainScreenMap);
