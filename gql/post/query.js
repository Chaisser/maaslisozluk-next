import { gql } from "@apollo/client";

const GETPOST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      description
      isEditable
      createdAt
      updatedAt
      likesCount
      totalEarnings
      topic {
        id
        title
        slug
      }
      user {
        id
        username
      }
      favorites {
        id
      }
    }
  }
`;

const CHECKFAVORITE = gql`
  query Post($id: ID!) {
    checkFavorite(id: $id) {
      result
    }
  }
`;

export { GETPOST, CHECKFAVORITE };
