import React from 'react';

import {reviewTypes} from '../../prop-types/prop-types.jsx';
import {getRatingValue} from '../../utils.js';

const ReviewItem = ({user, comment, rating, date}) => {

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="property__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="74" height="74" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${getRatingValue(rating)}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {comment}
      </p>
      <time className="reviews__time" dateTime={
        `${new Date(date).getFullYear()}-${new Date(date).getMonth()}-${new Date(date).getDate()}`
      }>
        {`April ${new Date(date).getFullYear()}`}
      </time>
    </div>
  </li>;
};

ReviewItem.propTypes = {
  user: reviewTypes.user,
  comment: reviewTypes.comment,
  rating: reviewTypes.rating,
  date: reviewTypes.date
};

export default ReviewItem;
