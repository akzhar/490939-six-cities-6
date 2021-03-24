import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import browserHistory from '../../browser-history.js';

import {AppRoute} from '../../const.js';
import PrivateRoute from '../private-route/private-route.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';
import WithRoom from '../../hoc/with-room.jsx';

const App = () => {

  return <Router history={browserHistory}>
    <Switch>
      <Route path={AppRoute.MAIN} exact>
        <MainScreen/>
      </Route>
      <Route path={AppRoute.LOGIN} exact>
        <LoginScreen/>
      </Route>
      <PrivateRoute
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
          const offerId = +routeProps.match.params.id;
          return <WithRoom offerId={offerId}/>;
        }}
      />
      <Route>
        <NotFoundScreen/>
      </Route>
    </Switch>
  </Router>;
};

export default App;
