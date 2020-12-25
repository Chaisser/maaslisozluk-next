import { GET_CATEGORIES, GET_TOPICS } from "./../actions/category";

const initialState = {
  categories: [],
  topics: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.categories };
    case GET_TOPICS:
      return { ...state, topics: action.topics };
    default:
      return state;
  }
};

export default categoryReducer;
