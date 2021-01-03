import { gql } from "@apollo/client";

const GETPOST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      description
      topic {
        id
        title
        slug
      }
    }
  }
`;

export { GETPOST };
