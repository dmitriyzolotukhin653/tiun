// This is the first file that ReactNative will run when it starts up.
import React from 'react'
import App from "./app/app.tsx"
import { registerRootComponent } from "expo"

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache()
});

const AppApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

registerRootComponent(AppApollo)
export default AppApollo
