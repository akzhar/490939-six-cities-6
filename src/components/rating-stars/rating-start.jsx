import React from 'react';
import PropTypes from 'prop-types';
import {RATING_STARS_COUNT} from '../../const.json';

const RatingStars = ({rating, className = ``}) => {

  const getRatingValue = (value) => Math.round(value) * 100 / RATING_STARS_COUNT;

  return <div className={`rating__stars ${className}`}>
    <span style={{width: `${getRatingValue(rating)}%`}}></span>
    <span className="visually-hidden">Rating</span>
  </div>;
};

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default RatingStars;
