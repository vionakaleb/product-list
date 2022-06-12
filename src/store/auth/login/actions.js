import Moment from "moment";

import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  LOGIN_FAILED,
} from "./actionTypes";

export const loginUser = (loginRes) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: { loginRes },
  });
};

export const loginSuccess = (data) => (dispatch) => {
  const { user, token, tokenType, expiresIn } = data;
  localStorage.setItem("localUser", JSON.stringify(data));
  localStorage.setItem("localToken", JSON.stringify(token));
  localStorage.setItem("localTokenType", JSON.stringify(tokenType));
  localStorage.setItem(
    "localTokenExpires",
    JSON.stringify(Moment().unix() + expiresIn)
  );

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user,
      token,
      tokenType,
      expiresIn,
    },
  });
};

export const loginFailed = (message) => (dispatch) => {
  dispatch({
    type: LOGIN_FAILED,
    payload: { message },
  });
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  };
};
