import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {Class, OfferTypeToOfferProperty} from '../../const.js';

import Header from '../header/header.jsx';
import PremiumMark from '../premium-mark/premium-mark.jsx';
import ToBookMarksBtn from '../to-bookmarks-btn/to-bookmarks-btn.jsx';
import Reviews from '../reviews/reviews.jsx';
import RoomScreenMap from '../room-screen-map/room-screen-map.jsx';
import RoomScreenPlaces from '../room-screen-places/room-screen-places.jsx';
import RatingStars from '../rating-stars/rating-stars.jsx';
import Popup from '../popup/popup.jsx';

const RoomScreen = ({offer, offersNear}) => {

  return <React.Fragment>
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((path) => (
                <div className="property__image-wrapper" key={path}>
                  <img className="property__image" src={path} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer[`is_premium`] && <PremiumMark className="property"/>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <ToBookMarksBtn className="property" size={{width: 31, height: 33}} offerIsBookMarked={offer[`is_favorite`]} offerId={offer.id}/>
              </div>
              <div className="property__rating rating">
                <RatingStars rating={offer.rating} className="property__stars"/>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OfferTypeToOfferProperty[offer.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer[`max_adults`]} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((item) => (
                    <li className="property__inside-item" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${offer.host[`is_pro`] && Class.HOST_PRO}`}>
                    <img className="property__avatar user__avatar" src={offer.host[`avatar_url`]} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <Reviews offerId={offer.id}/>
            </div>
          </div>
          <section className="property__map map">
            {offersNear.length && <RoomScreenMap offers={[...offersNear, offer]} activeOfferId={offer.id}/>}
          </section>
        </section>
        <div className="container">
          {offersNear.length && <RoomScreenPlaces offers={offersNear}/>}
        </div>
      </main>
    </div>
    <Popup/>
  </React.Fragment>;
};

RoomScreen.propTypes = {
  offer: PropTypes.shape(offerTypes).isRequired,
  offersNear: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
};

export default RoomScreen;
