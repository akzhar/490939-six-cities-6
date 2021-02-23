import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

import "leaflet/dist/leaflet.css";

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const Map = ({city, points}) => {

  useEffect(() => {
    // инициализируем карту и ставим фокус на city
    const map = leaflet.map(`map`, {
      center: {lat: city.latitude, lng: city.longitude},
      zoom: city.zoom,
      zoomControl: true
    });

    // подключаем слой карты: `voyager`
    leaflet.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
    .addTo(map);

    points.forEach((point) => {
      leaflet.marker(point, {icon})
      .addTo(map)
      .bindPopup(point.title);
    });

  }, []);

  return <div
    id="map"
    style={{height: `100%`}}
  />;
};

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

export default Map;
