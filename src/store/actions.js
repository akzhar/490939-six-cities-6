export const ActionType = {
  CITY_CHANGE: `city/change`,
  OFFERS_READY: `offers/ready`
};

export const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: newCity
  }),
  offersReady: () => ({
    type: ActionType.OFFERS_READY
  })
};
