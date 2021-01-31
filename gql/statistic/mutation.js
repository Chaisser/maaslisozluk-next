import { gql } from "@apollo/client";
const CREATESTATISTIC = gql`
  mutation CreateStatistic($topic: ID!) {
    createStatistic(topic: $topic) {
      id
    }
  }
`;

export { CREATESTATISTIC };
