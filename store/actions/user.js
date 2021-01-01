import getClient from "./../../apollo/apollo";
import { CHECKTOKEN, CREATEUSER, LOGINUSER } from "./../../gql/user/query";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGINCHECK = "LOGINCHECK";

export const createUser = (username, email, city, password) => {
  return async (dispatch, getState) => {
    getClient()
      .mutate({
        mutation: CREATEUSER,
        variables: {
          username,
          email,
          city,
          password,
        },
      })
      .then((res) => {
        if (res.data) {
          return dispatch({ type: LOGIN_USER, result: res.data.createUser });
        }
        return dispatch({ type: LOGIN_ERROR, result: res.errors[0].message });
      });
  };
};

export const loginUser = (email, password, twoFactorCode) => {
  return async (dispatch, getState) => {
    getClient()
      .mutate({
        mutation: LOGINUSER,
        variables: {
          email,
          password,
          twoFactorCode,
        },
      })
      .then((res) => {
        if (res.data) {
          dispatch({ type: LOGIN_USER, result: res.data.loginUser });
        } else {
          dispatch({ type: LOGIN_ERROR, result: res.errors[0].message });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR, result: "err.message" });
      });
  };
};

export const checkToken = (token) => {
  return async (dispatch) => {
    getClient()
      .query({
        query: CHECKTOKEN,
        variables: {
          token,
        },
      })
      .then((res) => {
        dispatch({ type: LOGIN_USER, result: { token, user: res.data.checkToken } });
      })
      .catch((err) => {
        return err;
      });
  };
};

export const logoutUser = () => {
  console.log("buna?");
  return { type: LOGOUT };
};
