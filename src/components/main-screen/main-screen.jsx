import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Class, Message} from '../../const.js';
import {ActionCreator} from '../../store/actions.js';
import {getHasOffers} from '../../store/selectors.js';

import Header from '../header/header.jsx';
import MainScreenMap from '../main-screen-map/main-screen-map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import MainScreenPlacesLoading from '../main-screen-places-loading/main-screen-places-loading.jsx';
import MainScreenPlacesEmpty from '../main-screen-places-empty/main-screen-places-empty.jsx';
import MainScreenPlaces from '../main-screen-places/main-screen-places.jsx';
import Popup from '../popup/popup.jsx';

const MainScreen = ({offersIsLoaded, hasOffers, updateOffers, showPopup}) => {

  useEffect(() => {
    const onFail = () => showPopup(Message.ERROR.OFFERS_WAS_NOT_LOADED);
    updateOffers(null, onFail);
  }, []);

  return <React.Fragment>
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${(offersIsLoaded && !hasOffers) ? Class.PLACES_EMPTY : ``}`}>
            {(!offersIsLoaded && !hasOffers) && <MainScreenPlacesLoading/>}
            {(offersIsLoaded && !hasOffers) && <MainScreenPlacesEmpty/>}
            {(offersIsLoaded && hasOffers) && <MainScreenPlaces/>}
            <div className="cities__right-section">
              {(offersIsLoaded && hasOffers) && <MainScreenMap/>}
            </div>
          </div>
        </div>
      </main>
    </div>
    <Popup/>
  </React.Fragment>;
};

const mapStateToProps = (state) => ({
  offersIsLoaded: state.offers.isLoaded,
  hasOffers: getHasOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateOffers: (onSuccess, onFail) => dispatch(ActionCreator.updateOffers(onSuccess, onFail)),
  showPopup: (message) => dispatch(ActionCreator.showPopup(message))
});

MainScreen.propTypes = {
  offersIsLoaded: PropTypes.bool.isRequired,
  hasOffers: PropTypes.bool.isRequired,
  updateOffers: PropTypes.func.isRequired,
  showPopup: PropTypes.func.isRequired
};

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
