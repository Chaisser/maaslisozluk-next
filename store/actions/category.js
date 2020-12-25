import { gql } from "@apollo/client";
import getClient from "./../../apollo/apollo";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_TOPICS = "GET_TOPICS";

export const getCategories = () => {
  return async (dispatch, getState) => {
    if (getState().categories.categories.length !== 0) {
      return dispatch({ type: GET_CATEGORIES, categories: getState().categories.categories });
    }
    getClient(getState().user.token)
      .query({
        query: gql`
          query Category {
            categories {
              id
              title
              description
              slug
            }
          }
        `,
        variables: {},
      })
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, categories: res.data.categories });
      });
  };
};

export const getTopics = (category, limit, skip, refetch) => {
  return async (dispatch, getState) => {
    if (getState().categories.categories.length !== 0 && !refetch) {
      return dispatch({ type: GET_TOPICS, topics: getState().categories.topics });
    }
    getClient()
      .query({
        query: gql`
          query {
            topics {
              id
              title
              slug
              category {
                id
                title
              }
              user {
                id
                username
              }
              createdAt
              updatedAt
            }
          }
        `,
      })
      .then((res) => {
        dispatch({ type: GET_TOPICS, topics: res.data.topics });
      });
  };
};
