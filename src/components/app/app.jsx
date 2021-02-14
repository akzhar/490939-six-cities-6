import React from 'react';
import PropTypes from 'prop-types';
import {offerShape, reviewShape} from '../../prop-types/prop-types.jsx';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import MainScreen from '../main-screen/main-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import RoomScreen from '../room-screen/room-screen.jsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';

const App = ({offers, reviews}) => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <MainScreen offers={offers}/>
      </Route>
      <Route path="/login" exact>
        <LoginScreen/>
      </Route>
      <Route path="/favorites" exact>
        <FavoritesScreen/>
      </Route>
      <Route path="/room/:id" exact render={() => (
        <RoomScreen offers={offers} reviews={reviews}/>
      )}/>
      <Route>
        <NotFoundScreen/>
      </Route>
    </Switch>
  </BrowserRouter>
);

App.propTypes = {
  offers: PropTypes.arrayOf(offerShape).isRequired,
  reviews: PropTypes.arrayOf(reviewShape).isRequired
};

export default App;
