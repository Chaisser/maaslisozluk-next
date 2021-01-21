import { GET_STATUS } from "./../actions/adblocker";

const initialState = {
  status: false,
};

const adblockerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export default adblockerReducer;
