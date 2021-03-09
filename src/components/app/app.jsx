import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {AppRoute} from '../../const.js';
import PrivateRoute from '../private-route/private-route.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import RoomScreen from '../room-screen/room-screen.jsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';

const App = ({offers, isAuthorized}) => {

  return <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <MainScreen/>
      </Route>
      <Route path={AppRoute.LOGIN} exact>
        <LoginScreen/>
      </Route>
      <PrivateRoute
        isAuthorized={isAuthorized}
        path={AppRoute.FAVORITES}
        exact={true}
        render = {(_routeProps) => {
          return <FavoritesScreen/>;
        }}
      />
      <Route
        path={`${AppRoute.OFFER}/:id`}
        exact
        render={(routeProps) => {
          const roomId = +routeProps.match.params.id;
          const offer = offers.find((room) => room.id === roomId);
          return offer ? <RoomScreen offer={offer}/> : <NotFoundScreen/>;
        }}
      />
      <Route>
        <NotFoundScreen/>
      </Route>
    </Switch>
  </BrowserRouter>;
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  isAuthorized: state.isAuthorized
});

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

export {App};
export default connect(mapStateToProps, null)(App);
