import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import categoryReducer from "./reducers/category";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
  categories: categoryReducer,
  user: userReducer,
});

const makeStore = (initialState) => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};

export default makeStore;
