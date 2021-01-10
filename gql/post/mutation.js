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

const LIKEPOST = gql`
  mutation LikePost($id: ID!, $likeType: LikeType) {
    likePost(id: $id, likeType: $likeType) {
      id
      likesCount
    }
  }
`;

const FAVORITEPOST = gql`
  mutation FavoritePost($id: ID!) {
    favoritePost(id: $id) {
      result
    }
  }
`;

export { CREATETOPIC, CREATEPOST, UPDATEPOST, FAVORITEPOST, LIKEPOST };
