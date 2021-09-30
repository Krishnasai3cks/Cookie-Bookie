import * as api from "../api/index.js";
import * as constants from "../constants.js";
export const getUser = () => async (dispatch) => {
  try {
    const user = await api.getUser();
    dispatch({ type: constants.GET_USER, payload: user });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: constants.LOGIN, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: constants.REGISTER, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const logoutUser = (history) => async (dispatch) => {
  try {
    const { data } = await api.logout();
    dispatch({ type: constants.LOGOUT, payload: {} });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const switchRole = () => async (dispatch) => {
  try {
    dispatch({ type: constants.LOADING });
    dispatch({ type: constants.SWITCH_ROLE });
    dispatch({ type: constants.LOADED });
  } catch (error) {
    console.log(error);
  }
};
