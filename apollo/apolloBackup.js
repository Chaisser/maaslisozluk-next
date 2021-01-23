import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const getClient = (token) => {
  let headers = undefined;
  if (token) {
    headers = {
      authorization: `Bearer ${token}`,
    };
  }
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: process.env.API_URL,
    headers,
  });

  const client = new ApolloClient({
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
