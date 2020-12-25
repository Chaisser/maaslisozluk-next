import { CREATE_USER, LOGIN_USER, LOGIN_ERROR, LOGOUT } from "./../actions/user";

const initialState = {
  user: {},
  token: "",
  errorMessage: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, token: action.result.token, user: { ...action.result.user }, errorMessage: "" };
    case LOGIN_ERROR:
      return { ...state, errorMessage: "e-posta veya şifre hatalı" };
    case LOGOUT:
      console.log("çıkış");
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
