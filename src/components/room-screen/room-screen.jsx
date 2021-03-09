import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import {Class} from '../../const.js';
import getApi, {apiRoute} from '../../api.js';

const api = getApi();

import Header from '../header/header.jsx';
import ToBookMarksBtn from '../to-bookmarks-btn/to-bookmarks-btn.jsx';
import CommentForm from '../comment-form/comment-form.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import RoomScreenMap from '../room-screen-map/room-screen-map.jsx';
import RoomScreenPlaces from '../room-screen-places/room-screen-places.jsx';
import RatingStars from '../rating-stars/rating-stars.jsx';

const RoomScreen = ({offer}) => {

  const [offersNear, setOffersNear] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const offersNearPromise = api.get(apiRoute.get.offersNear(offer.id));
    const reviewsPromise = api.get(apiRoute.get.reviews(offer.id));
    Promise.all([offersNearPromise, reviewsPromise])
      .then((responses) => {
        setOffersNear(responses[0].data);
        setReviews(responses[1].data);
      });
  }, [offer]);

  const PremiumMark = () => (
    <div className="property__mark">
      <span>Premium</span>
    </div>
  );

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
              {offer[`is_premium`] && <PremiumMark/>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <ToBookMarksBtn className="property" size={{width: 31, height: 33}}/>
              </div>
              <div className="property__rating rating">
                <RatingStars rating={offer.rating} className="property__stars"/>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
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
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews}/>
                <CommentForm/>
              </section>
            </div>
          </div>
          <section className="property__map map">
            {offersNear.length && <RoomScreenMap offers={offersNear}/>}
          </section>
        </section>
        <div className="container">
          {offersNear.length && <RoomScreenPlaces offers={offersNear}/>}
        </div>
      </main>
    </div>
  </React.Fragment>;
};

RoomScreen.propTypes = {
  offer: PropTypes.shape(offerTypes)
};

export default RoomScreen;
