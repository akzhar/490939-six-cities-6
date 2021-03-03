import React from 'react';
import PropTypes from 'prop-types';
import {mapCityTypes, mapPointTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';

import Map from '../map/map.jsx';

const MainScreenMap = ({city, points, activeOfferId}) => (
  <Map city={city} points={points} activeOfferId={activeOfferId}/>
);

const mapStateToProps = (state) => ({
  city: state.offers.find((offer) => offer.city.name === state.activeCity).city.location,
  points: state.offers.filter((offer) => offer.city.name === state.activeCity)
  .map((offer) => {
    return {
      id: offer.id,
      lat: offer.location.latitude,
      lng: offer.location.longitude,
      title: offer.title
    };
  }),
  activeOfferId: state.activeOfferId
});

MainScreenMap.propTypes = {
  city: PropTypes.shape(mapCityTypes).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape(mapPointTypes)).isRequired,
  activeOfferId: PropTypes.string
};

export {MainScreenMap};
export default connect(mapStateToProps, null)(MainScreenMap);
