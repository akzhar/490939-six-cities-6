export const ActionType = {
  CITY_CHANGE: `city/change`
};

export const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: newCity
  })
};
