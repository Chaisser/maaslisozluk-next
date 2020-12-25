import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const getClient = (token) => {
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: process.env.API_URL,
    headers: {
      deneme: `Bearer ${token}`,
    },
  });

  const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: link,
    name: "react-web-doruk",
    version: "1.3",
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
