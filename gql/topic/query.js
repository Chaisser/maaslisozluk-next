import { gql } from "@apollo/client";

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
