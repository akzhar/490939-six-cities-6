import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const MainScreenPlacesEmpty = ({activeCity}) => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">{`We could not find any property available at the moment in ${activeCity}`}</p>
    </div>
  </section>
);

MainScreenPlacesEmpty.propTypes = {
  activeCity: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  activeCity: state.active.city.name
});

export {MainScreenPlacesEmpty};
export default connect(mapStateToProps, null)(MainScreenPlacesEmpty);
