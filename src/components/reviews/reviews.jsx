import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ReviewsSortToCompareFunc, MAX_REVIEWS_COUNT, REVIEWS_SORT, apiRoute} from '../../const.js';
import getApi from '../../api.js';

const api = getApi();

import CommentForm from '../comment-form/comment-form.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';

const Reviews = ({offerId, isAuthorized}) => {

  const [reviews, setReviews] = useState([]);

  const prepareReviews = (reviewsArr) => {
    return reviewsArr
    .sort(ReviewsSortToCompareFunc[REVIEWS_SORT])
    .slice(0, MAX_REVIEWS_COUNT);
  };

  const onCommentSubmit = (newReviews) => setReviews(prepareReviews(newReviews));

  useEffect(() => {
    api.get(apiRoute.get.reviews(offerId))
      .then((response) => {
        setReviews(prepareReviews(response.data));
      })
      .catch((error) => {
        throw error;
      });
  }, [offerId]);

  return <section className="property__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ReviewsList reviews={reviews}/>
    {isAuthorized && <CommentForm onCommentSubmit={onCommentSubmit}/>}
  </section>;
};

Reviews.propTypes = {
  offerId: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthorized: state.user.isAuthorized
});

export {Reviews};
export default connect(mapStateToProps, null)(Reviews);

