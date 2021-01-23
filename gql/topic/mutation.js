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
  mutation CreatePost($description: String!, $topic: String!, $status: PostStatusType) {
    createPost(data: { description: $description, status: $status }, topic: $topic) {
      id
      description
      totalEarnings
      isEditable
      likesCount
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

export { CREATETOPIC, CREATEPOST };
