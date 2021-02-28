import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';

const CitiesList = ({cities, city, changeCity}) => (
  <ul className="locations__list tabs__list">
    {cities.map((cityName) => (
      <li className="locations__item" key={cityName}>
        <a
          className={`locations__item-link tabs__item ${(cityName === city) ? `tabs__item--active` : ``}`}
          onClick={() => changeCity(cityName)}
        >
          <span>{cityName}</span>
        </a>
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state) => ({
  cities: state.cities,
  city: state.city
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(newCity) {
    dispatch(ActionCreator.changeCity(newCity));
  },
});

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  changeCity: PropTypes.func.isRequired
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
