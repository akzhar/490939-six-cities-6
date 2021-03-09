import React from 'react';
import PropTypes from 'prop-types';

const ToBookMarksBtn = ({className, size, isActive}) => (
  <button type="button" className={`button ${className}__bookmark-button ${isActive && `${className}__bookmark-button--active`}`}>
    <svg className={`${className}__bookmark-icon`} width={size.width} height={size.height}>
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>
);

ToBookMarksBtn.propTypes = {
  className: PropTypes.string.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  isActive: PropTypes.bool
};

export default ToBookMarksBtn;
