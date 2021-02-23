import React from 'react';
import PropTypes from 'prop-types';

import {reviewTypes} from '../../prop-types/prop-types.jsx';

import ReviewItem from '../review-item/review-item.jsx';

const ReviewsList = ({reviews}) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <ReviewItem key={review.date} review={review}/>
    ))}
  </ul>
);

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewTypes)).isRequired
};

export default ReviewsList;

