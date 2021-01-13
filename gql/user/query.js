import { gql } from "@apollo/client";

const GETUSERBUDGET = gql`
  query {
    getBudget {
      result
    }
  }
`;

const GETUSERTRANSACTIONS = gql`
  query {
    getTransactions {
      id
      amount
      budgetType
      createdAt
      topic {
        id
        title
      }
    }
  }
`;
const GETAUTHOR = gql`
  query Author($username: String!) {
    author(username: $username) {
      id
      username
      postsCount
      topicsCount
      budget
      posts {
        id
        description
        user {
          id
          username
        }
        topic {
          id
          title
        }
        likes {
          id
        }
        favorites {
          id
        }
      }
    }
  }
`;

const CHECKTOKEN = gql`
  query CheckToken($token: String!) {
    checkToken(token: $token) {
      id
      username
      budget
    }
  }
`;

const CREATEUSER = gql`
  mutation CreateUser($username: String!, $email: String!, $city: String, $phoneNumber: String, $password: String!) {
    createUser(
      data: { username: $username, email: $email, city: $city, phoneNumber: $phoneNumber, password: $password }
    ) {
      user {
        id
        username
      }
      token
    }
  }
`;

const LOGINUSER = gql`
  mutation LoginUser($email: String!, $twoFactorCode: String, $password: String!) {
    loginUser(data: { email: $email, password: $password, twoFactorCode: $twoFactorCode }) {
      user {
        id
        username
        budget
      }
      token
    }
  }
`;

export { CHECKTOKEN, CREATEUSER, LOGINUSER, GETAUTHOR, GETUSERBUDGET, GETUSERTRANSACTIONS };
