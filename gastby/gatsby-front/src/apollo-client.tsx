import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GATSBY_API_URL,
  cache: new InMemoryCache(),
});
console.log("GraphQL endpoint:", process.env.GATSBY_API_URL);


export default client;
