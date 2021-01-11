import { CREATE_USER, LOGIN_USER, LOGIN_ERROR, LOGOUT, GETBUDGET } from "./../actions/user";
import Cookies from "js-cookie";

const initialState = {
  user: {},
  token: "",
  errorMessage: "",
  budget: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      Cookies.set("token", action.result.token);
      return {
        ...state,
        budget: action.result.user.budget,
        token: action.result.token,
        user: { ...action.result.user },
        errorMessage: "",
      };
    case LOGIN_ERROR:
      return { ...state, errorMessage: "e-posta veya şifre hatalı" };
    case GETBUDGET:
      return { ...state, budget: action.result };
    case LOGOUT:
      Cookies.remove("token");
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
