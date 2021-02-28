export const ActionType = {
  CITY_CHANGE: `city/change`,
  SORT_CHANGE: `sort/change`,
  OFFER_SET_ACTIVE: `offer/set/active`
};

export const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: newCity
  }),
  changeSort: (newSort) => ({
    type: ActionType.SORT_CHANGE,
    payload: newSort
  }),
  setActiveOffer: (activeOffer) => ({
    type: ActionType.OFFER_SET_ACTIVE,
    payload: activeOffer
  })
};
