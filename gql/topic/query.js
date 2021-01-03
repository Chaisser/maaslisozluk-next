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
  query {
    topics {
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
        user {
          id
          username
        }
        likes {
          id
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