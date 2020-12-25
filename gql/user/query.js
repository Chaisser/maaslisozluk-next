import { gql } from "@apollo/client";

const CHECKTOKEN = gql`
  query CheckToken($token: String!) {
    checkToken(token: $token) {
      id
      username
    }
  }
`;

const CREATEUSER = gql`
  mutation CreateUser($username: String!, $email: String!, $city: String, $password: String!) {
    createUser(data: { username: $username, email: $email, city: $city, password: $password }) {
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
      }
      token
    }
  }
`;

export { CHECKTOKEN, CREATEUSER, LOGINUSER };
