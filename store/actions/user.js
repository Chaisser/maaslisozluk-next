import getClient from "./../../apollo/apollo";
import { CHECKTOKEN, CREATEUSER, LOGINUSER, GETUSERBUDGET } from "./../../gql/user/query";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGINCHECK = "LOGINCHECK";
export const GETBUDGET = "GETBUDGET";

export const getBudget = () => {
  return async (dispatch, getState) => {
    getClient(getState().user.token)
      .query({
        query: GETUSERBUDGET,
        fetchPolicy: "network-only",
      })
      .then((res) => {
        const result = res.data.getBudget.result;
        return dispatch({ type: GETBUDGET, result });
      })
      .catch((err) => console.log(err));
  };
};

export const createUser = (username, email, city, phoneNumber, password) => {
  return async (dispatch, getState) => {
    getClient()
      .mutate({
        mutation: CREATEUSER,
        variables: {
          username: username.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          city,
          password,
        },
      })
      .then((res) => {
        if (res.data) {
          return dispatch({ type: LOGIN_USER, result: res.data.createUser });
        }
        return dispatch({ type: REGISTER_ERROR, result: res.errors[0].message });
      })
      .catch((err) => {
        return dispatch({ type: REGISTER_ERROR, result: "kullanıcı adı, e-posta veya telefon numarası kayıtlıdır." });
      });
  };
};

export const loginUser = (email, password, twoFactorCode) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN_ERROR, result: "" });

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
        dispatch({ type: LOGIN_ERROR, result: "kullanıcı adı veya şifre yanlış" });
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
  return { type: LOGOUT };
};
