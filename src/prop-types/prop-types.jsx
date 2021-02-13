import PropTypes from 'prop-types';

const locationShape = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
});

const cityShape = PropTypes.shape({
  location: PropTypes.shapeOf(locationShape),
  name: PropTypes.string.isRequired
});

const userShape = PropTypes.shape({
  avatarUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isPro: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
});

export const offerShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  city: PropTypes.shapeOf(PropTypes.shape(cityShape)).isRequired,
  description: PropTypes.string.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shapeOf(PropTypes.shape(userShape)).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFavourite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  location: PropTypes.shapeOf(PropTypes.shape(locationShape)).isRequired,
  maxAdults: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
});

export const reviewShape = PropTypes.shape({
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  user: PropTypes.shapeOf(PropTypes.shape(userShape)).isRequired
});
