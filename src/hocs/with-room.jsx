import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import getApi from '../api.js';
import {MAX_NEARBY_COUNT, apiRoute} from '../const.js';

const api = getApi();

import RoomScreen from '../components/room-screen/room-screen.jsx';
import NotFoundScreen from '../components/not-found-screen/not-found-screen.jsx';

const WithRoom = ({offerId}) => {

  const [offer, setOffer] = useState(null);
  const [offersNear, setOffersNear] = useState([]);

  useEffect(() => {
    const offerPromise = api.get(apiRoute.get.offer(offerId));
    const offersNearPromise = api.get(apiRoute.get.offersNear(offerId));
    Promise.all([offerPromise, offersNearPromise])
      .then((responses) => {
        setOffer(responses[0].data);
        setOffersNear(responses[1].data.slice(0, MAX_NEARBY_COUNT));
      })
      .catch((error) => {
        throw error;
      });
  }, [offerId]);

  return offer ? <RoomScreen offer={offer} offersNear={offersNear}/> : <NotFoundScreen/>;

};

WithRoom.propTypes = {
  offerId: PropTypes.number.isRequired
};

export default WithRoom;
