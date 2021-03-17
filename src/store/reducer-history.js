import {ActionType} from './actions.js';

const reducerHostory = (state, action) => {
  switch (action.type) {
    case ActionType.REDIRECT_TO:
      return {...state};
    default:
      return {...state};
  }
};

export default reducerHostory;
