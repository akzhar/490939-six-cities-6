import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {mapCityTypes, mapPointTypes} from '../../prop-types/prop-types.jsx';
import leaflet from 'leaflet';
import {MapIcon} from '../../const.js';

import 'leaflet/dist/leaflet.css';

const iconDefault = leaflet.icon({
  iconUrl: MapIcon.URL_DEFAULT,
  iconSize: [MapIcon.WIDTH, MapIcon.HEIGHT]
});

const iconActive = leaflet.icon({
  iconUrl: MapIcon.URL_ACTIVE,
  iconSize: [MapIcon.WIDTH, MapIcon.HEIGHT]
});

const Map = ({city, points, activeOfferId}) => {

  const center = {lat: city.latitude, lng: city.longitude};
  const zoom = city.zoom;
  const [mapInstance, setMap] = useState(null);

  const createMap = () => {
    const leafletMap = leaflet.map(`map`, {center, zoom, zoomControl: true});
    const mapLayer = leaflet.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        }
    );
    mapLayer.addTo(leafletMap);
    setMap(leafletMap);
    updateMap(leafletMap);
    markActiveOfferOnMap(leafletMap);
  };

  const updateMap = (map) => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          layer.remove();
        }
      });
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
          const icon = (layer.options.alt === activeOfferId) ? iconActive : iconDefault;
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
    id="map"
    style={{height: `100%`, zIndex: 0}}
  />;
};

Map.propTypes = {
  city: PropTypes.shape(mapCityTypes).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape(mapPointTypes)).isRequired,
  activeOfferId: PropTypes.number
};

export default React.memo(Map);
