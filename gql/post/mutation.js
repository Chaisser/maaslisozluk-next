import { gql } from "@apollo/client";

const CREATETOPIC = gql`
  mutation CreateTopic($title: String!, $description: String!, $category: ID!) {
    createTopic(data: { title: $title, description: $description }, category: $category) {
      id
      slug
    }
  }
`;

const CREATEPOST = gql`
  mutation CreatePost($description: String!, $topic: String!) {
    createPost(data: { description: $description }, topic: $topic) {
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
  }
`;

const UPDATEPOST = gql`
  mutation UpdatePost($description: String!, $id: ID!) {
    updatePost(data: { description: $description }, id: $id) {
      id
    }
  }
`;

export { CREATETOPIC, CREATEPOST, UPDATEPOST };
