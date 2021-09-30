import * as constants from "../constants.js";
const postReducer = (state = { posts: [], loaded: true }, action) => {
  switch (action.type) {
    case constants.LOADING:
      return { ...state, loaded: false };
    case constants.LOADED:
      return { ...state, loaded: true };
    case constants.FETCH_ALL:
      return { ...state, posts: action.payload };
    case constants.CREATE:
      return { ...state, posts: action.payload };
    case constants.PLACE_BID:
      return state;
    case constants.REMOVE_BID:
      return state;
    default:
      return state;
  }
};

export default postReducer;
