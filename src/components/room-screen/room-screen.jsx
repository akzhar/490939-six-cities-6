import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {offerTypes, reviewTypes} from '../../prop-types/prop-types.jsx';

import CommentForm from '../comment-form/comment-form.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
import OfferCard from '../offer-card/offer-card.jsx';

// TODO: move to config
const STARS_COUNT = 5;

const RoomScreen = ({offer, reviews, offersNear}) => {

  const PremiumMark = () => (
    <div className="property__mark">
      <span>Premium</span>
    </div>
  );

  const addProUserClass = (user) => user.isPro ? `property__avatar-wrapper--pro` : ``;

  // TODO: move to utils
  const getRatingValue = (rating) => Math.round(rating) * 100 / STARS_COUNT;

  return <React.Fragment>
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((imagePath) => (
                <div className="property__image-wrapper" key={imagePath}>
                  <img className="property__image" src={imagePath} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              { offer.isPremium ? <PremiumMark/> : ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingValue(offer.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
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
                  Max {offer.maxAdults} adults
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
                    <li className="property__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${addProUserClass(offer.host)} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
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
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>
                <CommentForm/>
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={offersNear[0].city.location}
              points={
                offersNear.map((offerNear) => {
                  return {
                    lat: offerNear.city.location.latitude,
                    lng: offerNear.city.location.longitude,
                    title: offerNear.title
                  };
                })
              }
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offersNear.map((offerNear) => (
                <OfferCard
                  key={offerNear.id}
                  offer={offerNear}
                  dataId={offerNear.id}
                  // handleOfferCardHover={handleOfferCardHover}
                  // handleOfferCardBlur={handleOfferCardBlur}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  </React.Fragment>;
};

RoomScreen.propTypes = {
  offer: PropTypes.shape(offerTypes),
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewTypes)).isRequired,
  offersNear: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired
};

export default RoomScreen;
