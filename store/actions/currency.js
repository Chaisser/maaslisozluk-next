import { gql } from "@apollo/client";
import getClient from "./../../apollo/apollo";
export const GET_CURRENCY = "GET_CURRENCY";

export const getCurrency = () => {
  return async (dispatch, getState) => {
    if (getState().currencies.currency.usDollar) {
      return dispatch({ type: GET_CURRENCY, currency: getState().currencies.currency });
    }
    getClient()
      .query({
        query: gql`
          query {
            currencies {
              id
              usDollar
              turkishLira
              createdAt
            }
          }
        `,
      })
      .then((res) => {
        dispatch({ type: GET_CURRENCY, currency: res.data.currencies });
      })
      .catch((err) => console.log(err, "ERROR FROM CURRENCY ACTION"));
  };
};
