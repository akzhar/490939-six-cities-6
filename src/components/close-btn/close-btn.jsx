import React from 'react';
import PropTypes from 'prop-types';

import './close-btn.css';

const CloseBtn = ({title, onClick}) => (
  <button
    className="close-btn"
    title={title}
    onClick={onClick}
    aria-label={title}
  >
    <span className="visually-hidden">{title}</span>
  </button>
);

CloseBtn.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CloseBtn;
