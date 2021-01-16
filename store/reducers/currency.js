import { GET_CURRENCY } from "./../actions/currency";

const initialState = {
  currency: {},
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENCY:
      return { ...state, currency: action.currency };
    default:
      return state;
  }
};

export default currencyReducer;
