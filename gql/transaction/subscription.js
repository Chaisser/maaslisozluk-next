import { gql } from "@apollo/client";

const TRANSACTIONSUBSCRIPTION = gql`
  subscription TransactionSubscription {
    transactionSubscription {
      mutation
      node {
        id
        amount
        budgetType
      }
    }
  }
`;

export { TRANSACTIONSUBSCRIPTION };
