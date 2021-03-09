export const MONTH_NAMES = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
export const SORT_OPTIONS = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];
export const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
export const RATING_STARS = [
  {value: 5, title: `perfect`},
  {value: 4, title: `good`},
  {value: 3, title: `not bad`},
  {value: 2, title: `badly`},
  {value: 1, title: `terribly`},
];
export const ActiveSortToCompareFunc = {
  "Price: low to high": (a, b) => a.price - b.price,
  "Price: high to low": (a, b) => b.price - a.price,
  "Top rated first": (a, b) => b.rating - a.rating
};
export const Class = {
  LIST_OPENED: `places__options--opened`,
  OPTION_ACTIVE: `places__option--active`,
  TAB_ACTIVE: `tabs__item--active`,
  PLACES_EMPTY: `cities__places-container--empty`,
  HOST_PRO: `property__avatar-wrapper--pro`
};
export const AppRoute = {
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/room`
};

