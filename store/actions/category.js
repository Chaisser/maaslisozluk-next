import { gql } from "@apollo/client";
import { CREATEPOST, CREATETOPIC } from "../../gql/topic/mutation";
import { GETTOPICS, GETTOPIC } from "../../gql/topic/query";
import getClient from "./../../apollo/apollo";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_TOPICS = "GET_TOPICS";
export const GET_TOPIC = "GET_TOPIC";
export const CREATE_TOPIC = "CREATE_TOPIC";
export const CREATE_POST = "CREATE_POST";
export const SET_CATEGORY_REFRESH = "SET_CATEGORY_REFRESH";
export const SET_CATEGORY = "SET_CATEGORY";

export const getCategories = (first) => {
  return async (dispatch, getState) => {
    if (getState().categories.categories.length !== 0) {
      return dispatch({ type: GET_CATEGORIES, categories: getState().categories.categories });
    }
    getClient(getState().user.token)
      .query({
        query: gql`
          query Category($first: Int) {
            categories(first: $first) {
              id
              title
              description
              slug
            }
          }
        `,
        variables: {
          first,
        },
      })
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, categories: res.data.categories });
      });
  };
};

export const getTopics = (category, first, skip, orderBy, refetch, categoryTitle) => {
  console.log(categoryTitle, "CATEGORY FROM ACTION");
  return async (dispatch, getState) => {
    if (getState().categories.categories.length !== 0 && !refetch) {
      return dispatch({ type: GET_TOPICS, topics: getState().categories.topics });
    }

    getClient(getState().user.token)
      .query({
        query: GETTOPICS,
        variables: {
          category,
          orderBy,
          first,
          skip,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_TOPICS,
          topics: res.data.topics.topics,
          totalTopic: res.data.topics.totalTopic,
          currentCategory: category,
          currentCategoryTitle: categoryTitle ? categoryTitle : "en yeniler",
        });
      });
  };
};

export const getTopic = (slug, limit, skip, refetch) => {
  console.log(getState().user.token);
  return async (dispatch, getState) => {
    getClient(getState().user.token)
      .query({
        query: GETTOPIC,
        variables: { slug },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          dispatch({ type: GET_TOPIC, topic: res.data.topic });
        }
      });
  };
};

export const createTopic = (title, description, category) => {
  return async (dispatch, getState) => {
    getClient(getState().user.token)
      .mutate({
        mutation: CREATETOPIC,
        variables: {
          title,
          description,
          category,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: CREATE_TOPIC, topic: res.data.createTopic.id });
      });
  };
};

export const setCategoryRefresh = (categoryRefresh) => {
  return {
    type: SET_CATEGORY_REFRESH,
    categoryRefresh,
  };
};

export const createPost = (description, topic) => {
  return async (dispatch, getState) => {
    getClient(getState().user.token)
      .mutate({
        mutation: CREATEPOST,
        variables: {
          description,
          topic,
        },
      })
      .then((res) => {
        if (res.data) {
          dispatch({ type: CREATE_POST });
          dispatch({ type: SET_CATEGORY_REFRESH, categoryRefresh: true });
        }
      });
  };
};
