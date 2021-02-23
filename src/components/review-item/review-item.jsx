import React from 'react';
import PropTypes from 'prop-types';

import {reviewTypes} from '../../prop-types/prop-types.jsx';

// TODO: move to config
const STARS_COUNT = 5;

const ReviewItem = ({review}) => {

  // TODO: move to utils
  const getRatingValue = (rating) => Math.round(rating) * 100 / STARS_COUNT;

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="property__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="74" height="74" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {review.user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${getRatingValue(review.rating)}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={
        `${new Date(review.date).getFullYear()}-${new Date(review.date).getMonth()}-${new Date(review.date).getDate()}`
      }>
        {`April ${new Date(review.date).getFullYear()}`}
      </time>
    </div>
  </li>;
};

ReviewItem.propTypes = {
  review: PropTypes.shape(reviewTypes)
};

export default ReviewItem;
