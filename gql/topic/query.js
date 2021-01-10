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
  query Topics($category: String) {
    topics(category: $category) {
      id
      title
      slug
      postsCount
      createdAt
      updatedAt
    }
  }
`;

const GETTOPIC = gql`
  query Topic($slug: String!) {
    topic(slug: $slug) {
      id
      title
      slug
      postsCount
      category {
        id
        title
      }
      posts {
        id
        description
        isEditable
        createdAt
        updatedAt
        likesCount
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
