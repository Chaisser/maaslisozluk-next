import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import categoryReducer from "./reducers/category";
import userReducer from "./reducers/user";

import { createWrapper, HYDRATE } from "next-redux-wrapper";

const rootReducer = combineReducers({
  categories: categoryReducer,
  user: userReducer,
});
const makeStore = (context) => createStore(rootReducer, applyMiddleware(ReduxThunk));
export const wrapper = createWrapper(makeStore, { debug: false });
