import PropTypes from 'prop-types';

export const offerShape = {
  isPremium: PropTypes.bool.isRequired,
  costEuro: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired
};
