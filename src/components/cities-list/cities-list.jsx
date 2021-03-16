import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {CITIES, Class} from '../../const.js';

const CitiesList = ({activeCity, changeActiveCity}) => {

  const handleCityNameClick = (cityName) => {
    if (cityName !== activeCity) {
      changeActiveCity(cityName);
    }
  };

  return <ul className="locations__list tabs__list">
    {CITIES.map((cityName) => (
      <li className="locations__item" key={cityName}>
        <a
          className={`locations__item-link tabs__item ${(cityName === activeCity) && Class.TAB_ACTIVE}`}
          onClick={() => handleCityNameClick(cityName)}
        >
          <span>{cityName}</span>
        </a>
      </li>
    ))}
  </ul>;
};

const mapStateToProps = (state) => ({
  activeCity: state.active.city
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveCity(newActiveCity) {
    dispatch(ActionCreator.changeActiveCity(newActiveCity));
  },
});

CitiesList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  changeActiveCity: PropTypes.func.isRequired
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
