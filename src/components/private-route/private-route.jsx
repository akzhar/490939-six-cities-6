import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {Route} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const PrivateRoute = ({path, exact, render, checkLogin, redirectTo}) => {

  const [accessDenied, setAccessDenied] = useState(true);

  useEffect(() => {
    const onSuccess = () => setAccessDenied(false);
    const onFail = () => redirectTo(AppRoute.LOGIN);
    checkLogin(onSuccess, onFail);
  }, []);

  return <Route
    path={path}
    exact={exact}
    render={(routeProps) => {
      if (!accessDenied) {
        return render(routeProps);
      }
    }}
  />;
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  checkLogin: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  checkLogin: (onSuccess, onFail) => dispatch(ActionCreator.checkLogin(onSuccess, onFail)),
  redirectTo: (to) => dispatch(ActionCreator.redirectTo(to))
});

export {PrivateRoute};
export default connect(null, mapDispatchToProps)(PrivateRoute);

