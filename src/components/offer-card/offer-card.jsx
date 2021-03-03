import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerTypes} from '../../prop-types/prop-types.jsx';
import RatingStars from '../rating-stars/rating-start.jsx';

const OfferCard = ({offer, handleHover = null, handleBlur = null}) => {

  const PremiumMark = () => (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

  return <article className="cities__place-card place-card" data-id={offer.id} onMouseEnter={handleHover} onMouseLeave={handleBlur}>
    {offer.isPremium ? <PremiumMark/> : ``}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={`/room/${offer.id}`}>
        <img className="place-card__image" src={offer[`preview_image`]} width="260" height="200" alt="Place image" />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <RatingStars rating={offer.rating} className="place-card__stars"/>
      </div>
      <h2 className="place-card__name">
        <a href="#">{offer.title}</a>
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
