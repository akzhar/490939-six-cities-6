import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import leaflet from 'leaflet';

import "leaflet/dist/leaflet.css";

// ф-ция возвращает новый слой карты: `voyager`
const getLayer = () => (
  leaflet.tileLayer(
      `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
      {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      }
  ));

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const Map = ({city, points}) => {

  const center = {lat: city.latitude, lng: city.longitude};
  const zoom = city.zoom;
  const [mapInstance, setMap] = useState(null);

  const createMap = () => {
    // инициализируем карту и ставим фокус на city
    const leafletMap = leaflet.map(`map`, {center, zoom, zoomControl: true});

    setMap(leafletMap);
    updateMap(leafletMap);
  };

  const updateMap = (map) => {
    if (map) {
      // очищаем карту
      map.eachLayer((layer) => map.removeLayer(layer));
      // подключаем слой карты
      getLayer().addTo(map);
      // устанвливаем фокус на city
      map.setView(center, zoom);
      // помещаем маркеры на карту
      points.forEach((point) => {
        leaflet.marker(point, {icon})
        .addTo(map)
        .bindPopup(point.title);
      });
    }
  };

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    updateMap(mapInstance);
  }, [city]);

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
      lat: offer.city.location.latitude,
      lng: offer.city.location.longitude,
      title: offer.title
    };
  })
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
  }))
};

export {Map};
export default connect(mapStateToProps, null)(Map);
