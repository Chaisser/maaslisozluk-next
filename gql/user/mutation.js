import { gql } from "@apollo/client";

const UPDATEUSER = gql`
  mutation UpdateUser($email: String, $phoneNumber: String, $city: String) {
    updateUser(data: { email: $email, phoneNumber: $phoneNumber, city: $city }) {
      id
    }
  }
`;

const CHANGEPASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $password: String!) {
    changePassword(data: { currentPassword: $currentPassword, password: $password }) {
      id
    }
  }
`;

const SENDEMAILACTIVATIONCODE = gql`
  mutation SendEmailActivationCode {
    sendEmailActivationCode {
      result
    }
  }
`;

const SENDPHONENUMBERACTIVATIONCODE = gql`
  mutation SendPhoneActivationCode {
    sendPhoneActivationCode {
      result
    }
  }
`;

const CHECKEMAILACTIVATIONCODE = gql`
  mutation CheckEmailActivationCode($id: ID!, $email: String!, $emailActivationCode: String!) {
    checkEmailActivationCode(id: $id, email: $email, emailActivationCode: $emailActivationCode) {
      result
    }
  }
`;

const CHECKPHONEACTIVATIONCODE = gql`
  mutation CheckPhoneActivationCode($phoneActivationCode: String!) {
    checkPhoneActivationCode(phoneActivationCode: $phoneActivationCode) {
      result
    }
  }
`;

export {
  UPDATEUSER,
  CHANGEPASSWORD,
  SENDEMAILACTIVATIONCODE,
  CHECKEMAILACTIVATIONCODE,
  SENDPHONENUMBERACTIVATIONCODE,
  CHECKPHONEACTIVATIONCODE,
};
