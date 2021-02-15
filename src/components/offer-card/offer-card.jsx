import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerShape} from '../../prop-types/prop-types.jsx';

// TODO: move to config
const STARS_COUNT = 5;

const OfferCard = ({offer, dataId, hoverHandler}) => {

  const PremiumMark = () => (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

  // TODO: move to utils
  const getRatingValue = (rating) => Math.round(rating) * 100 / STARS_COUNT;

  return <article className="cities__place-card place-card" data-id={dataId} onMouseEnter={hoverHandler}>
    {offer.isPremium ? <PremiumMark/> : ``}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={`/room/${offer.id}`}>
        <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
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
        <div className="place-card__stars rating__stars">
          <span style={{width: `${getRatingValue(offer.rating)}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>;
};

OfferCard.propTypes = {
  offer: offerShape.isRequired,
  dataId: PropTypes.number.isRequired,
  hoverHandler: PropTypes.func.isRequired
};

export default OfferCard;
