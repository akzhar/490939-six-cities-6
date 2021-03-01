import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import leaflet from 'leaflet';

import "leaflet/dist/leaflet.css";

// ф-ция возвращает новый слой карты: `voyager`
const mapLayer = leaflet.tileLayer(
    `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
    {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }
);

const iconDefault = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const iconActive = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [30, 30]
});

const Map = ({city, points, activeOfferId}) => {

  const center = {lat: city.latitude, lng: city.longitude};
  const zoom = city.zoom;
  const [mapInstance, setMap] = useState(null);

  const createMap = () => {
    const leafletMap = leaflet.map(`map`, {center, zoom, zoomControl: true});

    setMap(leafletMap);
    updateMap(leafletMap);
  };

  const updateMap = (map) => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          layer.remove();
        }
      });
      mapLayer.addTo(map);
      map.setView(center, zoom);
      points.forEach((point) => {
        leaflet.marker(point, {icon: iconDefault, alt: point.id}).addTo(map).bindPopup(point.title);
      });
    }
  };

  const markActiveOfferOnMap = (map) => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          const icon = (layer.options.alt === +activeOfferId) ? iconActive : iconDefault;
          layer.setIcon(icon);
        }
      });
    }
  };

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    updateMap(mapInstance);
  }, [city]);

  useEffect(() => {
    markActiveOfferOnMap(mapInstance);
  }, [activeOfferId]);

  return <div
    id = "map"
    style = {{height: `100%`}}
  />;
};

const mapStateToProps = (state) => ({
  city: state.offers.find((offer) => offer.city.name === state.city).city.location,
  points: state.offers.filter((offer) => offer.city.name === state.city)
  .map((offer) => {
    return {
      id: offer.id,
      lat: offer.city.location.latitude,
      lng: offer.city.location.longitude,
      title: offer.title
    };
  }),
  activeOfferId: state.activeOfferId
});

Map.propTypes = {
  city: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  points: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),
  activeOfferId: PropTypes.string
};

export {Map};
export default connect(mapStateToProps, null)(Map);
