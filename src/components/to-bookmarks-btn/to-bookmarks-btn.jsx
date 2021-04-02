import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {AppRoute} from '../../const.js';

const ToBookMarksBtn = ({className, size, offerIsBookMarked, offerId, isAuthorized, redirectTo, bookMarkOffer}) => {

  const [isBookMarked, setIsBookMarked] = useState(offerIsBookMarked);

  const handleToBookMarksBtnClick = (isBookmarked) => {
    if (!isAuthorized) {
      redirectTo(AppRoute.LOGIN);
      return;
    }
    bookMarkOffer(!isBookmarked, offerId);
    setIsBookMarked(!isBookmarked);
  };

  return <button
    type="button"
    onClick={() => handleToBookMarksBtnClick(isBookMarked)}
    className={`button ${className}__bookmark-button ${isBookMarked && `${className}__bookmark-button--active`}`}
  >
    <svg className={`${className}__bookmark-icon`} width={size.width} height={size.height}>
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>;
};

ToBookMarksBtn.propTypes = {
  className: PropTypes.string.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  offerIsBookMarked: PropTypes.bool.isRequired,
  offerId: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  redirectTo: PropTypes.func.isRequired,
  bookMarkOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.user.isAuthorized
});

const mapDispatchToProps = (dispatch) => ({
  redirectTo: (to) => dispatch(ActionCreator.redirectTo(to)),
  bookMarkOffer: (isBookMarked, offerId) => dispatch(ActionCreator.bookMarkOffer(isBookMarked, offerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToBookMarksBtn);
