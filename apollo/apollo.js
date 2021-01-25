import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const getClient = (token) => {
  let headers = undefined;
  if (token) {
    headers = {
      authorization: `Bearer ${token}`,
    };
  }

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: `wss://api.maaslisozluk.com`,
        options: {
          reconnect: true,
        },
      })
    : null;

  const httplink = new HttpLink({
    uri: "https://api.maaslisozluk.com",
    headers,
  });

  const cache = new InMemoryCache();

  const link = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httplink
      )
    : httplink;

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: cache,
    link: link,
    name: "interaktif-is",
    version: "0.1",
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  return client;
};

export default getClient;
