import {
  GET_CATEGORIES,
  GET_TOPICS,
  GET_TOPIC,
  CREATE_TOPIC,
  CREATE_POST,
  SET_CATEGORY_REFRESH,
} from "./../actions/category";

const initialState = {
  categories: [],
  topics: [],
  topic: {},
  categoryRefresh: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.categories };
    case GET_TOPICS:
      return { ...state, topics: action.topics };
    case GET_TOPIC:
      return { ...state, topic: action.topic };
    case CREATE_TOPIC:
      return { ...state };
    case CREATE_POST:
      return { ...state };
    case SET_CATEGORY_REFRESH:
      return { ...state, categoryRefresh: action.categoryRefresh };
    default:
      return state;
  }
};

export default categoryReducer;
