import React, {useState} from 'react';
import {RATING_STARS} from '../../const.js';

const CommentForm = () => {

  const [, setRating] = useState();
  const [, setComment] = useState();

  return <form className="reviews__form form" action="#" method="post">
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {RATING_STARS.map((star) => (
        <React.Fragment key={star.title}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={star.value}
            id={`${star.value}-stars`}
            type="radio"
            onChange={() => setRating(star.value)}
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
      onChange={(evt) => setComment(evt.target.value)}
    >
    </textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
    </div>
  </form>;
};

export default CommentForm;
