export const ActionType = {
  CITY_CHANGE: `city/change`,
  SORT_CHANGE: `sort/change`
};

export const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: newCity
  }),
  changeSort: (newSort) => ({
    type: ActionType.SORT_CHANGE,
    payload: newSort
  })
};
