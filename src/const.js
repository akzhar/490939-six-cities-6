export const RATING_STARS_COUNT = 5;
export const SORT_OPTIONS = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];
export const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
export const SortToCompareFunc = {
  "Price: low to high": (a, b) => a.price - b.price,
  "Price: high to low": (a, b) => b.price - a.price,
  "Top rated first": (a, b) => b.rating - a.rating
};

