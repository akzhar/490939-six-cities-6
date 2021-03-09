import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PlacesMainEmpty = ({activeCity}) => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">{`We could not find any property available at the moment in ${activeCity}`}</p>
    </div>
  </section>
);

const mapStateToProps = (state) => ({
  activeCity: state.activeCity
});

PlacesMainEmpty.propTypes = {
  activeCity: PropTypes.string.isRequired
};

export {PlacesMainEmpty};
export default connect(mapStateToProps, null)(PlacesMainEmpty);
