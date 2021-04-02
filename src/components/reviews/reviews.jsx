import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ReviewsSortToCompareFunc, MAX_REVIEWS_COUNT, REVIEWS_SORT} from '../../const.js';
import {ActionCreator} from '../../store/actions.js';

import CommentForm from '../comment-form/comment-form.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';

const Reviews = ({offerId, isAuthorized, getReviews}) => {

  const [reviews, setReviews] = useState([]);

  const prepareReviews = (reviewsArr) => {
    return reviewsArr
    .sort(ReviewsSortToCompareFunc[REVIEWS_SORT])
    .slice(0, MAX_REVIEWS_COUNT);
  };

  const onCommentSubmit = (newReviews) => setReviews(prepareReviews(newReviews));

  useEffect(() => {
    const onSuccess = (data) => {
      setReviews(prepareReviews(data));
    };
    getReviews(offerId, onSuccess);
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
  isAuthorized: PropTypes.bool.isRequired,
  getReviews: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthorized: state.user.isAuthorized
});

const mapDispatchToProps = (dispatch) => ({
  getReviews: (offerId, onSuccess, onFail) => dispatch(ActionCreator.getReviews(offerId, onSuccess, onFail))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

