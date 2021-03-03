import PropTypes from 'prop-types';

const locationTypes = {
  "latitude": PropTypes.number.isRequired,
  "longitude": PropTypes.number.isRequired,
  "zoom": PropTypes.number.isRequired,
};

const cityTypes = {
  "location": PropTypes.shape(locationTypes).isRequired,
  "name": PropTypes.string.isRequired
};

const userTypes = {
  "avatar_url": PropTypes.string.isRequired,
  "id": PropTypes.number.isRequired,
  "is_pro": PropTypes.bool.isRequired,
  "name": PropTypes.string.isRequired
};

const offerTypes = {
  "id": PropTypes.number.isRequired,
  "bedrooms": PropTypes.number.isRequired,
  "city": PropTypes.shape(cityTypes).isRequired,
  "description": PropTypes.string.isRequired,
  "goods": PropTypes.arrayOf(PropTypes.string).isRequired,
  "host": PropTypes.shape(userTypes).isRequired,
  "images": PropTypes.arrayOf(PropTypes.string).isRequired,
  "is_favorite": PropTypes.bool.isRequired,
  "is_premium": PropTypes.bool.isRequired,
  "location": PropTypes.shape(locationTypes).isRequired,
  "max_adults": PropTypes.number.isRequired,
  "preview_image": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "rating": PropTypes.number.isRequired,
  "title": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired
};

const reviewTypes = {
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  user: PropTypes.shape(userTypes).isRequired
};

export {offerTypes, reviewTypes};
