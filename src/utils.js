import {RATING_STARS_COUNT} from './const.json';

export const getRatingValue = (rating) => Math.round(rating) * 100 / RATING_STARS_COUNT;
