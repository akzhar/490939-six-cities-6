import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {getPointsArray} from '../../utils.js';

import Map from '../map/map.jsx';

const RoomScreenMap = ({offers, activeOfferId}) => {

  const city = useMemo(() => {
    return offers[0].city.location;
  }, [activeOfferId]);

  const points = useMemo(() => {
    return getPointsArray(offers);
  }, [activeOfferId]);

  return <Map city={city} points={points} activeOfferId={activeOfferId}/>;
};

RoomScreenMap.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  activeOfferId: PropTypes.number.isRequired
};

export default RoomScreenMap;
