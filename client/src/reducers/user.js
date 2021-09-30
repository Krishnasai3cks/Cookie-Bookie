import * as constants from "../constants.js";
const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case constants.LOGIN:
    case constants.REGISTER: {
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload, currentRole: "Buyer" })
      );

      return {
        ...state,
        user: action.payload,
        loading: false,
        errors: null,
      };
    }
    case constants.LOGOUT:
      localStorage.clear();
      return { ...state, user: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
