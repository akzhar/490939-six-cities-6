import React from 'react';

import {reviewTypes} from '../../prop-types/prop-types.jsx';
import RatingStars from '../rating-stars/rating-start.jsx';

const ReviewItem = ({user, comment, rating, date}) => {

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="property__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={user[`avatar_url`]} width="74" height="74" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <RatingStars rating={rating} className="reviews__stars"/>
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
