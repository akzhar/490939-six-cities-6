import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import getApi, {apiRoute} from '../api.js';

const api = getApi();

import RoomScreen from '../components/room-screen/room-screen.jsx';
import NotFoundScreen from '../components/not-found-screen/not-found-screen.jsx';

const WithRoom = ({offerId, isAuthorized}) => {

  const [offer, setOffer] = useState();

  useEffect(() => {
    api.get(apiRoute.get.offer(offerId))
    .then((response) => {
      setOffer(response.data);
    })
    .catch((error) => {
      throw error;
    });
  }, []);

  return offer ? <RoomScreen offer={offer} isAuthorized={isAuthorized}/> : <NotFoundScreen/>;

};

const mapStateToProps = (state) => ({
  isAuthorized: state.user.isAuthorized
});

WithRoom.propTypes = {
  offerId: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

export {WithRoom};
export default connect(mapStateToProps, null)(WithRoom);
