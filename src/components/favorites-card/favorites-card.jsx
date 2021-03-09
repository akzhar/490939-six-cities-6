import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import RatingStars from '../rating-stars/rating-stars.jsx';

import ToBookMarksBtn from '../to-bookmarks-btn/to-bookmarks-btn.jsx';

const FavoritesOfferCard = ({offer}) => {

  return <article className="favorites__card place-card">
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <Link to={`/room/${offer.id}`}>
        <img className="place-card__image" src={offer[`preview_image`]} width="150" height="110" alt="Place image" />
      </Link>
    </div>
    <div className="favorites__card-info place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <ToBookMarksBtn className="place-card" size={{width: 18, height: 19}} isActive={true}/>
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

FavoritesOfferCard.propTypes = {
  offer: PropTypes.shape(offerTypes)
};

export default FavoritesOfferCard;
