import { gql } from "@apollo/client";

const LIVEPOSTSUBSCRIPTION = gql`
  subscription LivePostSubscription($slug: String!) {
    livePostSubscription(slug: $slug) {
      mutation
      node {
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
  }
`;

export { LIVEPOSTSUBSCRIPTION };
