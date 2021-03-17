import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {getPointsArray} from '../../utils.js';

import Map from '../map/map.jsx';

const RoomScreenMap = ({offers}) => {

  const city = offers[0].city.location;
  const points = getPointsArray(offers);

  return <Map city={city} points={points}/>;
};

RoomScreenMap.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
};

export default RoomScreenMap;
