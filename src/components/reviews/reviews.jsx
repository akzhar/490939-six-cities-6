import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ReviewsSortToCompareFunc, MAX_REVIEWS_COUNT} from '../../const.js';
import getApi, {apiRoute} from '../../api.js';

const api = getApi();

import CommentForm from '../comment-form/comment-form.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';

const REVIEWS_SORT = `Date: latest to earliest`;

const Reviews = ({offerId, isAuthorized}) => {

  const [reviews, setReviews] = useState([]);

  const onCommentSubmit = (newReviews) => setReviews(newReviews);

  useEffect(() => {
    api.get(apiRoute.get.reviews(offerId))
      .then((response) => {
        setReviews(response.data.slice(0, MAX_REVIEWS_COUNT));
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return <section className="property__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ReviewsList reviews={reviews.sort(ReviewsSortToCompareFunc[REVIEWS_SORT])}/>
    {isAuthorized && <CommentForm onCommentSubmit={onCommentSubmit}/>}
  </section>;
};

Reviews.propTypes = {
  offerId: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

export default Reviews;

