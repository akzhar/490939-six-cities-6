import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {CITIES, Class} from '../../const.js';

const CitiesList = ({activeCity, changeActiveCityName, setActiveCityHasOffers}) => {

  const handleCityNameClick = (cityName) => {
    if (cityName !== activeCity) {
      changeActiveCityName(cityName);
      setActiveCityHasOffers();
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
  activeCity: state.active.city.name
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveCityName: (newName) => dispatch(ActionCreator.changeActiveCityName(newName)),
  setActiveCityHasOffers: () => dispatch(ActionCreator.setActiveCityHasOffers()),
});

CitiesList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  changeActiveCityName: PropTypes.func.isRequired,
  setActiveCityHasOffers: PropTypes.func.isRequired,
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
