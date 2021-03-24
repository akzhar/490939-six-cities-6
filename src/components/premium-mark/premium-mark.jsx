import React from 'react';
import PropTypes from 'prop-types';

const PremiumMark = ({className}) => (
  <div className={`${className}__mark`}>
    <span>Premium</span>
  </div>
);

PremiumMark.propTypes = {
  className: PropTypes.string.isRequired
};

export default PremiumMark;
