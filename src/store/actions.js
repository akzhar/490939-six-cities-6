export const ActionType = {
  OFFERS_LOAD: `offers/load`,
  CITY_CHANGE: `city/change`,
  SORT_CHANGE: `sort/change`,
  OFFER_SET_ACTIVE: `offer/set/active`
};

export const ActionCreator = {
  setOffers: (offers) => ({
    type: ActionType.OFFERS_LOAD,
    payload: offers
  }),
  changeActiveCity: (newActiveCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: newActiveCity
  }),
  changeActiveSort: (newActiveSort) => ({
    type: ActionType.SORT_CHANGE,
    payload: newActiveSort
  }),
  setActiveOfferId: (activeOfferId) => ({
    type: ActionType.OFFER_SET_ACTIVE,
    payload: activeOfferId
  })
};
