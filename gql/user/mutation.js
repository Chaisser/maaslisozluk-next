import { gql } from "@apollo/client";

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

export { SENDEMAILACTIVATIONCODE, CHECKEMAILACTIVATIONCODE, SENDPHONENUMBERACTIVATIONCODE };
