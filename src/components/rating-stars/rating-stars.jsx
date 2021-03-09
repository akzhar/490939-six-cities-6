import React from 'react';
import PropTypes from 'prop-types';
import {RATING_STARS} from '../../const.js';

const RatingStars = ({rating, className = ``}) => (
  <div className={`rating__stars ${className}`}>
    <span style={{width: `${Math.round(rating) * 100 / RATING_STARS.length}%`}}></span>
    <span className="visually-hidden">Rating</span>
  </div>
);

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default RatingStars;
