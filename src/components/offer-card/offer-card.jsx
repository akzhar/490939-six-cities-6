import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerTypes} from '../../prop-types/prop-types.jsx';

import RatingStars from '../rating-stars/rating-stars.jsx';
import ToBookMarksBtn from '../to-bookmarks-btn/to-bookmarks-btn.jsx';

const OfferCard = ({offer, handleHover = null, handleBlur = null}) => {

  const PremiumMark = () => (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

  return <article className="cities__place-card place-card" data-id={offer.id} onMouseEnter={handleHover} onMouseLeave={handleBlur}>
    {offer[`is_premium`] && <PremiumMark/>}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={`/room/${offer.id}`}>
        <img className="place-card__image" src={offer[`preview_image`]} width="260" height="200" alt="Place image"/>
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <ToBookMarksBtn className="place-card" size={{width: 18, height: 19}} offerIsBookMarked={offer[`is_favorite`]} offerId={offer.id}/>
      </div>
      <div className="place-card__rating rating">
        <RatingStars rating={offer.rating} className="place-card__stars"/>
      </div>
      <h2 className="place-card__name">
        <Link to={`/room/${offer.id}`}>
          {offer.title}
        </Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>;
};

OfferCard.propTypes = {
  offer: PropTypes.shape(offerTypes).isRequired,
  handleHover: PropTypes.func,
  handleBlur: PropTypes.func
};

export default OfferCard;
