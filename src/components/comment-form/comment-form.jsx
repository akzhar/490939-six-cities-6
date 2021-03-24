import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {RATING_STARS, ROOM_ID_REGEXP, Message, CommentLength, apiRoute} from '../../const.js';
import getApi from '../../api.js';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';

const api = getApi();

const CommentForm = ({onCommentSubmit, showPopup}) => {

  const [formIsDisabled, setFormIsDisabled] = useState(false);

  const formRef = useRef();
  const ratingFormRef = useRef();
  const textAreaRef = useRef();
  const submitBtnRef = useRef();
  const history = useHistory();

  const getCommentValue = () => textAreaRef.current.value;

  const getRatingValue = () => ratingFormRef.current.dataset.value;

  const isRatingSet = () => {
    const rating = getRatingValue();
    return rating !== null;
  };

  const isCommentValid = () => {
    const comment = getCommentValue();
    return (comment.length >= CommentLength.MIN &&
            comment.length <= CommentLength.MAX) ? true : false;
  };

  const handleRatingClick = (evt) => {
    if (evt.target.tagName === `INPUT`) {
      ratingFormRef.current.dataset.value = evt.target.value;
      submitBtnRef.current.disabled = isCommentValid() ? false : true;
    }
  };

  const handleTextAreaChange = () => {
    if (isCommentValid()) {
      submitBtnRef.current.disabled = isRatingSet() ? false : true;
    } else {
      submitBtnRef.current.disabled = true;
    }
  };

  const disableForm = (bool) => {
    setFormIsDisabled(bool);
    submitBtnRef.current.disabled = true;
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    disableForm(true);
    const offerId = history.location.pathname.match(ROOM_ID_REGEXP)[0];
    const url = apiRoute.post.comment(offerId);
    api.post(url, {comment: getCommentValue(), rating: getRatingValue()})
      .then((response) => {
        showPopup(Message.OK.COMMENT_WAS_UPLOADED);
        onCommentSubmit(response.data);
      })
      .catch((error) => {
        showPopup(Message.ERROR.COMMENT_WAS_NOT_UPLOADED);
        throw error;
      })
      .finally(() => {
        formRef.current.reset();
        disableForm(false);
      });
  };

  return <form className="reviews__form form" action="#" method="post" ref={formRef} onSubmit={handleFormSubmit}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating" data-value={null} ref={ratingFormRef} onClick={handleRatingClick}>
      {RATING_STARS.map((star) => (
        <React.Fragment key={star.title}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={star.value}
            id={`${star.value}-stars`}
            type="radio"
            disabled={formIsDisabled}
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
      disabled={formIsDisabled}
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
  onCommentSubmit: PropTypes.func.isRequired,
  showPopup: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  showPopup: (message) => dispatch(ActionCreator.showPopup(message))
});

export default connect(null, mapDispatchToProps)(CommentForm);

