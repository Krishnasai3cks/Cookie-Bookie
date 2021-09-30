import * as api from "../api/index.js";
import * as constants from "../constants.js";
export const createPostAction = (data, history) => async (dispatch) => {
  try {
    const post = await api.createPost(data);
    dispatch({ type: constants.CREATE, payload: post.data });
    history.push("/posts");
  } catch (error) {
    console.log(error);
  }
};
export const getPostsAction =
  (history, redirectto = "/posts") =>
  async (dispatch) => {
    try {
      const posts = await api.getPosts();
      dispatch({ type: constants.LOADING });
      dispatch({ type: constants.FETCH_ALL, payload: posts.data });
      dispatch({ type: constants.LOADED });
      history.push(redirectto);
    } catch (error) {
      console.log(error);
    }
  };
export const newBidAction =
  (postId, userId, value, history) => async (dispatch) => {
    try {
      const updateBidList = await api.placeBid(postId, userId, value);

      dispatch({ type: constants.PLACE_BID });
      console.log("I am here atleast");
      history.push("/posts");
    } catch (error) {
      console.log(error);
    }
  };
export const removebidAction =
  (postId, userId, history) => async (dispatch) => {
    try {
      const updateBidList = await api.removeBid(postId, userId);

      dispatch({ type: constants.REMOVE_BID });
      history.push("/posts");
    } catch (error) {
      console.log(error);
    }
  };

export const likePostAction = (id, history) => async (dispatch) => {
  try {
    await api.likePost(id);
    dispatch({ type: constants.LIKE });
    history.push("/posts");
  } catch (error) {
    console.log(error);
  }
};
