import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {connect} from 'react-redux';

import Map from '../map/map.jsx';

const MainScreenMap = ({activeCity, offers, activeOfferId}) => {

  const city = useMemo(() => {
    return offers.find((offer) => offer.city.name === activeCity).city.location;
  }, [activeCity]);

  const points = useMemo(() => {
    return offers.filter((offer) => offer.city.name === activeCity)
            .map((offer) => {
              return {
                id: offer.id,
                lat: offer.location.latitude,
                lng: offer.location.longitude,
                title: offer.title
              };
            });
  }, [activeCity]);

  return <Map city={city} points={points} activeOfferId={activeOfferId}/>;
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  offers: state.offers,
  activeOfferId: state.activeOfferId
});

MainScreenMap.propTypes = {
  activeCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  activeOfferId: PropTypes.string
};

export {MainScreenMap};
export default connect(mapStateToProps, null)(MainScreenMap);
