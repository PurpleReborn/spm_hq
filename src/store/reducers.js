import { SET_AUTHENTICATED } from './action-types';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: payload.auth, user: payload.user };
    default:
      return state;
  }
};

export default reducer;
