import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const PrivateRoute = ({isAuthorized, path, exact, render}) => {
  return <Route
    path={path}
    exact={exact}
    render={(routeProps) => (isAuthorized ? render(routeProps) : <Redirect to={AppRoute.LOGIN}/>)}
  />;
};

PrivateRoute.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired
};

export default PrivateRoute;

