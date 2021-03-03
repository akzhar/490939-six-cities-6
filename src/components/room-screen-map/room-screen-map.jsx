import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import Map from '../map/map.jsx';

const RoomScreenMap = ({offers}) => {

  const city = offers[0].city.location;
  const points = offers.map((offer) => {
    return {
      id: offer.id,
      lat: offer.location.latitude,
      lng: offer.location.longitude,
      title: offer.title
    };
  });

  return <section className="property__map map">
    <Map city={city} points={points}/>
  </section>;
};

RoomScreenMap.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
};

export default RoomScreenMap;
