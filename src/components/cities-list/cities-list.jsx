import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';

const CitiesList = ({city, sixSities, onCityChange}) => (
  <ul className="locations__list tabs__list">
    {sixSities.map((cityName) => (
      <li className="locations__item" key={cityName}>
        <a
          className={`locations__item-link tabs__item ${(cityName === city) ? `tabs__item--active` : ``}`}
          onClick={() => onCityChange(cityName)}
        >
          <span>{cityName}</span>
        </a>
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state) => ({
  city: state.city
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(newCity) {
    dispatch(ActionCreator.changeCity(newCity));
  },
});

CitiesList.propTypes = {
  city: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
  sixSities: PropTypes.arrayOf(PropTypes.string).isRequired
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
