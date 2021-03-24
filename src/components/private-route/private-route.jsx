import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const PrivateRoute = ({path, exact, render, isAuthorized}) => {
  return <Route
    path={path}
    exact={exact}
    render={(routeProps) => (isAuthorized ? render(routeProps) : <Redirect to={AppRoute.LOGIN}/>)}
  />;
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthorized: state.user.isAuthorized
});

export {PrivateRoute};
export default connect(mapStateToProps, null)(PrivateRoute);

