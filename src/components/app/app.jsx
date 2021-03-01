import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {offerTypes, reviewTypes} from '../../prop-types/prop-types.jsx';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import MainScreen from '../main-screen/main-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import RoomScreen from '../room-screen/room-screen.jsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';

const App = ({offers, reviews}) => {

  return <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <MainScreen/>
      </Route>
      <Route path="/login" exact>
        <LoginScreen/>
      </Route>
      <Route path="/favorites" exact>
        <FavoritesScreen/>
      </Route>
      <Route path="/room/:id" exact render={(routeProps) => {
        const offer = offers.find((room) => room.id.toString() === routeProps.match.params.id);
        const offerReviews = offer ? reviews.filter((review) => review.id === offer.id) : [];
        return offer ? <RoomScreen
          offer={offer}
          reviews={offerReviews}
          // offersNear - в будущем данные об объявлениях неподалёку будут приходить с сервера
          offersNear={offers.slice(0, 3)}
        /> : <NotFoundScreen/>;
      }}/>
      <Route>
        <NotFoundScreen/>
      </Route>
    </Switch>
  </BrowserRouter>;
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  reviews: state.reviews
});

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewTypes)).isRequired
};

export {App};
export default connect(mapStateToProps, null)(App);
