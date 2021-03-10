import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {RATING_STARS, ROOM_ID_REGEXP} from '../../const.js';
import getApi, {apiRoute} from '../../api.js';

const api = getApi();

const CommentLength = {
  MAX: 300,
  MIN: 50
};

const CommentForm = ({isAuthorized, onCommentSubmit}) => {

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);

  const ratingFormRef = useRef();
  const textAreaRef = useRef();
  const submitBtnRef = useRef();

  const history = useHistory();

  const handleRatingClick = (evt) => {
    if (evt.target.tagName === `INPUT`) {
      setRating(evt.target.value);
      submitBtnRef.current.disabled = (comment) ? false : true;
    }
  };

  const handleTextAreaChange = (evt) => {
    const text = evt.target.value;
    if (text.length >= CommentLength.MIN &&
        text.length <= CommentLength.MAX) {
      setComment(text);
      submitBtnRef.current.disabled = (rating) ? false : true;
    } else {
      setComment(null);
      submitBtnRef.current.disabled = true;
    }
  };

  const disableForm = (bool) => {
    textAreaRef.current.disabled = bool;
    submitBtnRef.current.disabled = true;
    for (let child of ratingFormRef.current.children) {
      if (child.tagName === `INPUT`) {
        child.disabled = bool;
      }
    }
  };

  const cleanForm = () => {
    textAreaRef.current.value = ``;
    for (let child of ratingFormRef.current.children) {
      if (child.tagName === `INPUT`) {
        child.checked = false;
      }
    }
  };

  const resetForm = () => {
    disableForm(false);
    cleanForm();
    setRating(null);
    setComment(null);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    disableForm(true);
    const offerId = history.location.pathname.match(ROOM_ID_REGEXP)[0];
    api.post(apiRoute.post.comment(offerId), {comment, rating})
    .then((response) => {
      onCommentSubmit(response.data);
      resetForm();
    })
    .catch((error) => {
      throw error;
    });
  };

  return isAuthorized &&
  <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit} disabled={true}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating" ref={ratingFormRef} onClick={handleRatingClick}>
      {RATING_STARS.map((star) => (
        <React.Fragment key={star.title}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={star.value}
            id={`${star.value}-stars`}
            type="radio"
          />
          <label htmlFor={`${star.value}-stars`} className="reviews__rating-label form__rating-label" title={star.title}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
    <textarea
      className="reviews__textarea form__textarea"
      id="review" name="review"
      placeholder="Tell how was your stay, what you like and what can be improved"
      ref={textAreaRef}
      onChange={handleTextAreaChange}
      minLength={CommentLength.MIN}
      maxLength={CommentLength.MAX}
    >
    </textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" ref={submitBtnRef} disabled={true}>Submit</button>
    </div>
  </form>;
};

CommentForm.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  onCommentSubmit: PropTypes.func.isRequired
};

export default CommentForm;

