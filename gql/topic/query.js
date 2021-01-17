import { gql } from "@apollo/client";

//authorTopics

const GETAUTHORTOPICS = gql`
  query AuthorTopics($user: String!) {
    authorTopics(user: $user) {
      id
      title
      slug
      postsCount
      createdAt
      updatedAt
    }
  }
`;

const GETTOPICS = gql`
  query Topics($category: String, $first: Int, $skip: Int, $orderBy: String) {
    topics(category: $category, first: $first, skip: $skip, orderBy: $orderBy) {
      topics {
        id
        title
        slug
        postsCount
        createdAt
        updatedAt
      }
      totalTopic
    }
  }
`;

const GETTOPIC = gql`
  query Topic($slug: String!, $first: Int, $skip: Int) {
    topic(slug: $slug) {
      id
      title
      slug
      postsCount
      category {
        id
        title
      }
      posts(first: $first, skip: $skip) {
        id
        description
        isEditable
        createdAt
        updatedAt
        likesCount
        totalEarnings
        user {
          id
          username
        }
        favorites {
          id
        }
      }
      user {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export { GETTOPICS, GETTOPIC };
