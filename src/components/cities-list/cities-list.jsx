import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {Class} from '../../const.js';

const CitiesList = ({cities, activeCity, changeActiveCity}) => (
  <ul className="locations__list tabs__list">
    {cities.map((cityName) => (
      <li className="locations__item" key={cityName}>
        <a
          className={`locations__item-link tabs__item ${(cityName === activeCity) && Class.TAB_ACTIVE}`}
          onClick={() => changeActiveCity(cityName)}
        >
          <span>{cityName}</span>
        </a>
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state) => ({
  cities: state.cities,
  activeCity: state.activeCity
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveCity(newActiveCity) {
    dispatch(ActionCreator.changeActiveCity(newActiveCity));
  },
});

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string.isRequired,
  changeActiveCity: PropTypes.func.isRequired
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
